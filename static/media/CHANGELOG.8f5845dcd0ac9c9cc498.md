# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.8.0] - 2024-11-10
### Added
- New hero: Kez
- New hero: Muerta
- New hero: Ringmaster
- Clear checked heroes button

## [1.7.0] - 2022-03-16
### Added
- New hero: Primal Beast

## [1.6.1] - 2022-01-26
### Fixed
- All default behavior of key presses were prevented, which made stuff like pressing F5 to reload the page impossible. Now only prevents the default behavior of space which would otherwise scroll the page when searching. (Thanks to zyxago for reporting this: https://github.com/Gimanua/dota-hero-checker/issues/1)

## [1.6.0] - 2022-01-19
### Added
- PNG images as sources for the browser to choose from when not supporting AVIF, WEBP or JPEG.

### Changed
- A search can no longer begin with a white space.
- It's no longer possible to append a white space to the search query if the query already ends with a white space.
- The Escape key will now clear the current search even if it hasn't timed out.
- Non-printable keys (except Escape and Backspace) will no longer clear the search.
- Pressing spacebar will no longer scroll down the page.
- The styling of the action buttons (Random Unchecked Hero, Export and Import) with orange background and margins between eachother.

### Fixed
- The backup src for legacy browser of every hero image had a faulty URL.

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