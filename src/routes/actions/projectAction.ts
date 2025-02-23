/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Project action for the app
 */

/**
 * Node modules
 */
import { redirect } from 'react-router';

/**
 * Custom modules
 */
import { databases } from '@/lib/appwrite';
import { generateID, getUserId } from '@/lib/utils';

/**
 * Environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

/**
 * Types
 */
import type { ActionFunction } from 'react-router';
import type { ProjectForm } from '@/types';
import type { Models } from 'appwrite';

const createProject = async (data: ProjectForm) => {
  let project: Models.Document | null = null;
  const aiTaskGen = data.ai_task_gen;
  const taskGenPrompt = data.task_gen_prompt;

  try {
    project = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      generateID(),
      {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
        userId: getUserId(),
      },
    );
  } catch (err) {
    console.error('Error creating project', err);
  }

  return redirect(`/app/projects/${project?.$id}`);
};

const projectAction: ActionFunction = async ({ request }) => {
  const method = request.method;
  const data = (await request.json()) as ProjectForm;

  if (method === 'POST') {
    return await createProject(data);
  }

  return null;
};

export default projectAction;
