### Create a single Express-based app that serves two separate, unrelated pieces of functionality.

**In-memory stack (FIFO):**
The first piece of functionality is an in-memory stack (FIFO).  This portion of the application should have two endpoints:
- an endpoint to add an item to the stack
- an endpoint to return the top item of the stack
    - requesting an item from the stack should also remove that item from the top of the stack
This process should be in-memory, so you don't need to worry about persisting the stack across restarts of the application.

