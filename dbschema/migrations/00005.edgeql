CREATE MIGRATION m15dvoq5dtct4pxyn34ii4n2reqcqboinlcolyntdwbjrdc3jknssa
    ONTO m14v7srvxuofhqeprhb5jwd6lqbyhwhamdxcj5cm3lwjewnzi6b2xa
{
  ALTER TYPE default::Game {
      CREATE PROPERTY recent_players -> array<std::str>;
  };
};
