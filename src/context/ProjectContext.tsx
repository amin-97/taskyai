/**
 * @copyright 2025 datacharge
 * @license Apache-2.0
 * @description Project Context component for the app
 */

/**
 * Node modules
 */
import { createContext, useContext } from 'react';

/**
 * Types
 */
import type { Models } from 'appwrite';

type ProjectProviderProps = {
  projects: Models.DocumentList<Models.Document>;
  children: React.ReactNode;
};

const ProjectContext =
  createContext<Models.DocumentList<Models.Document> | null>(null);

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  projects,
  children,
}) => {
  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProjects = () => useContext(ProjectContext);
