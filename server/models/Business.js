
/*

- ### Business
    - A Business is the parent of all users. A business has a primary account associated with it, contains Appointments, Contains Users, and contains a Calendar for managing Appointments based on user.
        - _id
        - name
            - Internally your name
            - String
            - Required
        - brand_name
            - What customers see
            - String
            - Required
        - business_logo
        - Settings
            - All account specific options
            - Obj
            - Relation
        - Configuration
            - Unique system-specific options
            - Obj
            - Relation
        - Appointments_Type
            - Array
            - Relation
        - Appointments
            - Array
            - Relation
        - Users
            - Array
            - Relation
        - admin_user_id


*/