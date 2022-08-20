CREATE MIGRATION m14v7srvxuofhqeprhb5jwd6lqbyhwhamdxcj5cm3lwjewnzi6b2xa
    ONTO m1e6in7p7qe4fjtpcump4wj2l44hap52couje6dkonmycz4j5rjfqq
{
  ALTER TYPE default::Game {
      DROP PROPERTY recent_players;
  };
};
