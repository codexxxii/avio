import { createFileRoute } from "@tanstack/react-router";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import { type CreateRecipe, createRecipeSchema } from "@server/shared-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "@/lib/constants";
import Dropzone, { type FileRejection } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { ImageUp, PlusIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/recipes/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<CreateRecipe>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      name: "",
      image_url: "",
      servings: "1",
      prep_time: "0",
      cook_time: "0",
      category: "",
      ingredients: [{ ingredient: "" }],
      instructions: [{ instruction: "" }],
    },
  });

  const {
    fields: ings,
    append: addIng,
    remove: remIng,
  } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  const {
    fields: ins,
    append: addIns,
    remove: remIns,
  } = useFieldArray({
    name: "instructions",
    control: form.control,
  });

  const onDropAccepted = async (acceptedFiles: File[]) => {
    await startUpload(acceptedFiles);
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    toast.error(
      `File type ${rejectedFiles[0].file.type} not accepted. Try again.`,
    );
  };

  const accept = {
    "image/jpg": [".jpg"],
    "image/jpeg": [".jpeg"],
    "image/png": [".png"],
  };

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      setImageUrl(data.ufsUrl);
    },
  });

  return (
    <FormProvider {...form}>
      <form className="p-5 w-full space-y-4">
        {/* Name, Category, Save */}
        <div className="w-full flex gap-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                placeholder="Name"
                className="grow outline-none text-5xl font-extrabold tracking-tighter"
              />
            )}
          />
          <div className="flex space-x-4">
            <div className="px-5 h-8 bg-black text-white rounded-md">
              <Controller
                name="category"
                control={form.control}
                render={({ field }) => (
                  <select
                    className="w-full h-full bg-black text-white space-x-2"
                    {...field}
                  >
                    {categories.map((i) => (
                      <option key={i.id} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <button type="button" className="bg-black text-white">
              Save
            </button>
          </div>
        </div>
        <div className="w-full flex gap-4 h-100">
          {/* Image */}
          {!imageUrl && !isUploading && (
            <Dropzone
              onDropAccepted={onDropAccepted}
              onDropRejected={onDropRejected}
              accept={accept}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="w-1/2 h-full rounded-md border border-gray-100 overflow-hidden grid place-items-center"
                >
                  <input {...getInputProps()} className="absolute" />
                  <ImageUp size={15} className="text-gray-400" />
                </div>
              )}
            </Dropzone>
          )}
          {isUploading && (
            <div className="w-1/2 h-full rounded-md border border-gray-100 overflow-hidden grid place-items-center">
              <div className="w-5 h-5 rounded-full border border-gray-500 animate-spin border-r-transparent!" />
            </div>
          )}
          {imageUrl && !isUploading && (
            <div className="w-1/2 h-full rounded-md border border-gray-100 overflow-hidden relative">
              <img
                src={imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {/* Serving, Prep Time, Cook Time */}
          <div className="w-1/2 space-y-4">
            <div className="w-full h-10 flex justify-between items-center">
              <p>Servings</p>
              <div className="px-5 w-32 h-8 bg-gray-100 rounded-md">
                <Controller
                  name="servings"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      defaultValue={"1"}
                      min={1}
                      type="number"
                      {...field}
                      className="w-full h-full outline-none"
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full h-10 flex justify-between items-center">
              <p>Prep Time in minutes</p>
              <div className="px-5 w-32 h-8 bg-gray-100 rounded-md">
                <Controller
                  name="prep_time"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      defaultValue={"0"}
                      min={0}
                      type="number"
                      {...field}
                      className="w-full h-full outline-none"
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full h-10 flex justify-between items-center">
              <p>Cook Time in minutes</p>
              <div className="px-5 w-32 h-8 bg-gray-100 rounded-md">
                <Controller
                  name="cook_time"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      defaultValue={"0"}
                      min={0}
                      type="number"
                      {...field}
                      className="w-full h-full outline-none"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-4">
          {/* Ingredients */}
          <div className="w-1/2 space-y-4">
            <div className="w-full flex justify-between items-center">
              <p className="text-3xl font-extrabold tracking-tighter">
                Ingredients
              </p>
              <button
                type="button"
                className="bg-black text-white flex items-center gap-2"
                onClick={() => addIng({ ingredient: "" })}
              >
                <PlusIcon size={12} /> Ingredient
              </button>
            </div>
            {ings.map((field, index) => (
              <div
                key={field.id}
                className="w-full flex justify-between items-center gap-4"
              >
                <Controller
                  name={`ingredients.${index}.ingredient`}
                  control={form.control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="outline-none grow border border-gray-100 rounded-md px-5 h-8"
                      placeholder="Ingredient"
                    />
                  )}
                />
                <button
                  type="button"
                  className="p-0! w-8! grid place-items-center bg-red-500 text-white"
                  onClick={() => remIng(index)}
                >
                  <XIcon size={12} />
                </button>
              </div>
            ))}
          </div>
          {/* Instructions */}
          <div className="w-1/2 space-y-4">
            <div className="w-full flex justify-between items-center">
              <p className="text-3xl font-extrabold tracking-tighter">
                Instructions
              </p>
              <button
                type="button"
                className="bg-black text-white flex items-center gap-2"
                onClick={() => addIns({ instruction: "" })}
              >
                <PlusIcon size={12} /> Instruction
              </button>
            </div>
            {ins.map((field, index) => (
              <div
                key={field.id}
                className="w-full flex justify-start items-start gap-4"
              >
                <Controller
                  name={`instructions.${index}.instruction`}
                  control={form.control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="outline-none grow border border-gray-100 rounded-md px-5 py-2 h-32 resize-none"
                      placeholder="Instruction"
                    />
                  )}
                />
                <button
                  type="button"
                  className="p-0! w-8! grid place-items-center bg-red-500 text-white"
                  onClick={() => remIns(index)}
                >
                  <XIcon size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
