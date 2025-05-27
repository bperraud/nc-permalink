# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.2.0 - 2025-04-09

### Added
- Correctly set the operator to the front of a line:

```diff
 const a =
-    1 +
-    2
+    1
+    + 2
```

```diff
 if (
-    some ||
-    other
+    some
+    || other
 ) {
```

### Changed
- Require at least prettier 3.5.0
- Migrate REUSE to TOML format

## v1.1.0 - 2024-05-04

### Added

- Also sort and format the `package.json` to make them consistent across Nextcloud

### Changed

- Adjust `printWidth` to 85 this makes migration from ESLint ok but looks much better than something higher

## v1.0.0 - 2024-04-16

### Added

- Implemented first version of Nextcloud prettier config.

<!--
  SPDX-FileCopyrightText: 2024 Nextcloud contributors
  SPDX-License-Identifier: CC0-1.0
-->
