# Bookmarker 

###  Conceptualization:

After having recently read a couple of books myself I'd like to keep track of said books alongside new ones that I'd like to read. So with that in mind The point of this website will be for a user to make a list of books they want to read and/or have read. I'll place a pseudo-code of functionality below:


### Pseudo-code

-   I need a to make a list of data that I need saved online inside a database:
    - list of users that will be made client side that will eventually be saved
        - passwords and emails need to be saved properly so that data is stored safely
    - list of books that will be supplied by custom API
    - list of reviews/marks made by the users to save for later/ make notes for

-   On landing of main page:
    - there should be a register/login screen

-   On login/registering:
    - there should be always a logout button present
    -  there should be a home page:
        - random recommended books should be displayed on homepage for user to click
            - onclick data will display page for single book
                - stuff like title, author, image, and reviews.
                - options to add book into marks list for user to review/mark.

-   There should always be a markers tab present for a user to click
    - onclick a page should be present:
        -   a list that is separated into two by a marker (boolean) that indicates wether a book is read or not
            - onclick data will display page for single book
                - stuff like title, author, image, and reviews.
                - options to add book into marks list for user to review/mark.


-   There should always be a search compartment:
    - allow user to search books by name
        - once searched the app will tap into the books list and grab appropriate data to display
        - onclick of single book data will display page for single book
            - stuff like title, author, image, and reviews.
            - options to add book into marks list for user to review/mark.


-   On single book info page:
    -   when a user is viewing reviews:
        - there should be an option to click on the review
    -   once clicked a list of reviews tied to the user who made them
        -   and on that list these reviews will lead to their respective single book page





