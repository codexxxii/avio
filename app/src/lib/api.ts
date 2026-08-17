import { hc } from "hono/client";
import type { ApiRoutes } from "@server/app";
import { queryClient } from "@/main";
import type { CreateNote, CreateRecipe } from "@server/shared-types";

const api = hc<ApiRoutes>("/").api;

export async function getCurrentUser() {
  try {
    const res = await api["current-user"].$get();

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

// Notes
export async function createNote(note: CreateNote) {
  try {
    const res = await api.notes.$post({ json: note });

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    queryClient.invalidateQueries({ queryKey: ["notes"] });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getNotes() {
  try {
    const res = await api.notes.$get();

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteNote({ id }: { id: string }) {
  try {
    const res = await api.notes.$delete({ json: { id } });

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    queryClient.invalidateQueries({ queryKey: ["notes"] });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Recipes
export async function getRecipes() {
  try {
    const res = await api.recipes.$get();

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createRecipe(recipe: CreateRecipe) {
  try {
    const res = await api.recipes.$post({ json: recipe });

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
