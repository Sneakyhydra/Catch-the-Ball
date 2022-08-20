CREATE MIGRATION m1zzdvvxee2vsm2dfohuineow6hzrzngfis6uly52v2zrkokkcjjaa
    ONTO m1zhmcujbdavleumu2hksfkkgzst5wuj54qhqbxhif6xlyjevuopfa
{
  ALTER TYPE default::Game {
      DROP PROPERTY recent_scores;
  };
  ALTER TYPE default::Game {
      DROP LINK player;
  };
  ALTER TYPE default::Game {
      DROP PROPERTY recent_players;
  };
  DROP TYPE default::Game;
  CREATE TYPE default::recent {
      CREATE REQUIRED LINK player -> default::User;
      CREATE REQUIRED PROPERTY score -> std::int32;
      CREATE PROPERTY time -> std::datetime {
          SET default := (std::datetime_current());
      };
  };
};
