# Global state management with Context API

Task 1: Modify code in src/task1 in a way that dispatch function has to never be called inside components, use custom hook exported from src/task1/context instead.

Task 2: Create two more contexts, one for adding age for the name given, and one to save the name/age as key value pair to its state. Add number input for adding the age and submit button to save the name and age. Display all of the saved values as stringified object (or by your own chosen method). Empty name and age states when saving from within the saved values context.