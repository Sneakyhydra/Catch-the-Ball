CREATE MIGRATION m1zhmcujbdavleumu2hksfkkgzst5wuj54qhqbxhif6xlyjevuopfa
    ONTO m15dvoq5dtct4pxyn34ii4n2reqcqboinlcolyntdwbjrdc3jknssa
{
  ALTER TYPE default::Game {
      CREATE LINK player -> default::User;
  };
};
