# Global state management with Context API

Task 1: Modify code in src/task1 in a way that dispatch function has to never be called inside components, use custom hook exported from src/task1/context instead.

Task 2: Create two more contexts, one for adding age for the name given, and one to save the name/age as key value pair to its state. Add number input for adding the age and submit button to save the name and age. Display all of the saved values as stringified object (or by your own chosen method). Empty name and age states when saving from within the saved values context.

Task 3: Set all of the state logic inside a single hook (one for each context), where the state mutation functions are returned as an object. useContext should not be called outside the hook, and components should only import the states and functions they need. Similarly, the contexts' Providers should be created inside the hooks. Note that useContext needs to still be called inside the hooks for the state, the Context cannot be created inside the hook or it will create a new context for every component using the hook, and that the reducer needs to be created together with the Provider component.