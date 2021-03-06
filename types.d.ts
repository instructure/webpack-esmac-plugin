import type { Rule } from 'esmac/types.d.ts'

type ESMACPluginOptions = {
  // Set of rules to provide to esmac.
  rules: Rule[];

  // Check the dependency whose source and target both match the pattern. This
  // is similar to Webpack's loader "test" property.
  ?test: RegExp;

  // Check the dependency whose source and target both reside at any of the
  // specified locations. This is similar to Webpack's loader "include"
  // property.
  ?include: PathFilter[];

  // Ignore any dependency whose source or target resides at any of the
  // specified locations. This is similar to Webpack's loader "exclude"
  // property.
  ?exclude: PathFilter[];

  // Format the generated errors into human-friendly versions. You can provide
  // hints and suggestions to the user to help them fix the reported problems
  // with this hook.
  ?formatter: ErrorFormatter;

  // Allow specific errors to go through. This gives you room to fix existing
  // errors and at the same time prevent new ones from being introduced.
  ?permit: PermittedError[];
};

// When given a String, the filter checks if the value starts with that string.
type PathFilter = String | RegExp;
type ErrorFormatter = (error: ESMACPluginError) => String;
type ESMACPluginError = AccessViolationError | SpecifierMismatchError;

// Raised when no rule was found that applies to the dependency
type AccessViolationError {
  source = Pathname;
  target = Pathname;
  request = String;
};

// Raised when the applicable rule fails its specifier check for the dependency
type SpecifierMismatchError {
  source = Pathname;
  target = Pathname;
  request = String;
  rule = Rule;
  ruleIndex = Number;
};

type PermittedError {
  name = "AccessViolationError" | "SpecifierMismatchError";
  source = Pathname;
  target = Pathname;
  request = String;
};