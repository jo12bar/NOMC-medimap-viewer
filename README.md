# NOMC-medimap-viewer

[![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)

![Screenshot of NOMC-medimap-viewer](./README-images/NOMC-medimap-viewer.png)

Medimap widget viewer + announcement slideshow for the North Okanagan Medical Clinic, running on a Raspberry Pi.

## I'm sorry, what?
My father works as a doctor at the [North Okanagan Medical Clinic](http://www.health-local.com/biz/walk-in-clinics/vernon/british-columbia/north-okanagan-medical-clinic/), and wanted a display running off a Raspberry Pi that could display info from [medimap.ca](https://medimap.ca) as well as a slideshow for announcements. I decided to run this off a Reveal.js slideshow.

## Installation (on a Raspberry Pi)
1. Get yourself a Raspberry Pi 2 or 3 with a fresh install of Raspbian.
2. Open terminal. Run `sudo raspi-config`.
3. Select option 3 (Boot Options). ![Screenshot of `raspi-config`](./README-images/raspi-config-1.png)
4. Select option B2 (Console Autologin). ![Screenshot of `raspi-config`](./README-images/raspi-config-2.png)
5. **OPTIONAL**: Enable remote ssh access.
  1. Back at the main menu, select option 9 (Advance Options). ![Screenshot of `raspi-config`](./README-images/raspi-config-3.png)
  2. Select option A4 (SSH). ![Screenshot of `raspi-config`](./README-images/raspi-config-4.png)
  3. Enable the SSH server. ![Screenshot of `raspi-config`](./README-images/raspi-config-5.png)
6. Exit `raspi-config`. Reboot.
7. You'll now be logged in to the command line. First, install the following packages:
```bash
sudo apt install -y git usbmount build-essential
# Install nodejs as according to https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt install -y nodejs
```
8. Run the install script from GitHub with the following command: <sub>...which I'll add when I push the code to GitHub and figure out the script's URL</sub>
9. Insert a USB stick loaded with images (in it's root directory), and reboot by running `sudo reboot`. The slideshow should start working - if anything goes wrong, then yell at me on [this repo's issue page](https://github.com/jo12bar/NOMC-medimap-viewer/issues).

## `npm` scripts
NOMC-medimap-viewer uses [`scripty`](https://github.com/testdouble/scripty) to organize npm scripts. The scripts are defined in the [`scripts` directory](./scripts), and replicated in [`scripts-win`](./scripts-win) for compatibility. In `package.json` you'll see the word `scripty` as opposed to the script content you'd expect. For more info, see [scripty's GitHub](https://github.com/testdouble/scripty).

| Script             | Description     |
| :----------------- | :------------------------------------------------------------------------ |
| `start`            | Run development server with webpack hot reloading.                        |
| `start:production` | Run production server with **NO** webpack hot reloading. You'll probably want to run `build` before this. |
| `build`            | Builds css & javascript in production configuration with webpack.         |
| `lint`             | Lint javascript with `eslint .`.                                          |
| `lint:fix`         | Lint & partially fix javascript with `eslint . --fix`.                    |
| `test`             | Yell about the lack of unit tests and exit with an error code of 1 :grin: |

More info will be added as I figure out what I need to do.

---
[LICENSE](./LICENSE)
