CREATE MIGRATION m1vf6klqdqlgfzrknhhoumfvc43jzewkp55nqjaygb4zzrbkptctdq
    ONTO m15bxvg3pqsxirdmwis7hn5hglfju7sythzasgnbrb57edfs4sv66q
{
  ALTER TYPE default::Recent {
      ALTER LINK player {
          CREATE PROPERTY name -> std::str;
      };
  };
};
