// DataContext.ts (if you're using TypeScript)
import { createContext } from 'react';

// Define the shape of the context
interface DataContextType {
  textValue: string;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
}

// Create context with the appropriate default value
export const DataContext = createContext<DataContextType | undefined>(undefined);
