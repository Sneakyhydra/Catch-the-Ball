CREATE MIGRATION m1e6in7p7qe4fjtpcump4wj2l44hap52couje6dkonmycz4j5rjfqq
    ONTO m1s5efm3rojr4tmdzt6y5pmbh2kkoecghcgrslfbl7zn4j2czkby2q
{
  CREATE TYPE default::Game {
      CREATE PROPERTY recent_scores -> array<std::int32>;
      CREATE PROPERTY recent_players -> array<std::uuid>;
  };
  ALTER TYPE default::User {
      CREATE PROPERTY high_score -> std::int32 {
          SET default := 0;
      };
  };
};
