CREATE MIGRATION m15bxvg3pqsxirdmwis7hn5hglfju7sythzasgnbrb57edfs4sv66q
    ONTO m1zzdvvxee2vsm2dfohuineow6hzrzngfis6uly52v2zrkokkcjjaa
{
  ALTER TYPE default::recent RENAME TO default::Recent;
};
