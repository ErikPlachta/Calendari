/*

- ### User
    - Anyone that can sign into the app.
    - Schema:
        - _id
        - name_first
            - String
            - Required
        - name_last
            - String
            - Required
        - username - __What your name previews as to others__
            - String
            - Required
        - emailEmailRequiredUnique
            - password_salt - __Their unique password salt created at time of user creation__
            - Required
            - String
        - password_hash
            - Required
            - String
            - Their password after being salted
        - verified - __User has verified their account__
        - date_Created - __Account created__
            - DateTime
            - Auto-Generated
        - date_Login - __Last Login__
            - DateTime
            - Auto-Updated on login
        - user_calendar - __Association to users calendar__
            - Array
                - Type __Internal / Google__
                - Name
                - DateTime - __availbiliy__
        - Appointments - __relation to appointment data type__
            - Array
                - Type __Internal / Google__
                - Name
                - DateTime - __availbiliy__
        - business_id - __Association to business__
        - account_id - __The state of their account__
        - user_type_id - __Association to user type__


*/