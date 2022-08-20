CREATE MIGRATION m13zva4hpiszwzsfcbwgjcq6vttlpt5xwplcg56juermpss2p2s2jq
    ONTO initial
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY email -> std::str;
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY password -> std::str;
  };
};
