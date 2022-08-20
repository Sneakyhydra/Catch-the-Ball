CREATE MIGRATION m1s5efm3rojr4tmdzt6y5pmbh2kkoecghcgrslfbl7zn4j2czkby2q
    ONTO m13zva4hpiszwzsfcbwgjcq6vttlpt5xwplcg56juermpss2p2s2jq
{
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
