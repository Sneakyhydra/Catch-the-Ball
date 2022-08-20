module default {
    type User {
        required property email -> str {
            constraint exclusive;
        };
        required property password -> str;
        required property name -> str;
        property high_score -> int32 {
            default := 0;
        };
    }

    type Recent {
        required property score -> int32;
        property time -> datetime {
            default := datetime_current();
        };
        required link player -> User {
            property name -> str;
        };
    }
}
