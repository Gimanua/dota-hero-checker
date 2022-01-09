# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.3] - 2022-01-09
### Added
- Different sizes of every hero image, letting the browser download the best fit automatically and thus reducing load time.

## [1.5.2] - 2021-12-20
### Fixed
- Fix image requests using capitalized first letter even though the images are all lowercase. Only some servers will "fix" this mistake for you, others will simply respond with HTTP 404 Not Found.

## [1.5.1] - 2021-12-19
### Changed
- **TL;DR: Images load faster.** Instead of always serving png images for the hero portraits, the browser will first try to download it in a more modern and compressed format in this order: avif, webp, jpeg. Only continuing if it's unable to interpret the format. 

## [1.5.0] - 2021-12-05
### Added
- Text displaying what your current search query is. Gradually fades out during 1.5 seconds to match the timeout of the search query.

### Changed
- When searching, heroes will now only be highlighted when their name includes the search query IF the search query contains 2 or more characters. If the search query is only 1 character the hero will only be highlighted if their name starts with that character.
- Only printable characters are now considered valid for the search query (before if you pressed Shift it would search for that)

## [1.4.0] - 2021-12-04
### Added
- Ability to search for heroes by simply typing keys, all heroes which contain the search query in their name is highlighted
and all else grayed out.
If you wait for more than 1.5 seconds until your next key press the search query will be reset.
All keys are considered valid for the search except backspace which instead will remove your last typed key.
- Version in header colored blue and displays this changelog when clicked.

### Changed
- Modals (the "pop-ups") are no longer closed when clicking inside of their content.

## [1.3.0] - 2021-11-28
### Added
- Percentage of checked heroes

## [1.2.0] - 2021-11-27
### Added
- Count of checked heroes and total heroes count

### Fixed
- Fix Nature's Prophet being displayed as Furion

## [1.1.0] - 2021-10-31
### Added
- Export button, exports the currently checked heroes as a JSON file the user can download
- Import button, imports checked heroes from a JSON file

## [1.0.1] - 2021-10-31
### Fixed
- Fix random unchecked hero button including checked heroes

## [1.0.0] - 2021-10-31
- Initial release!