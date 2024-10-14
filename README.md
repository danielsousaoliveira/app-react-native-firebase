# React Native App

React Native App using Firebase authentication.

## Installation

1. Install with npm

```bash
  cd react-native-auth-firebase
  npm i
```

2. Change app.json "ios" and "android" sections.

```bash
"ios": {
    "bundleIdentifier": "com.apptest" } // Change to your own firebase project
"android": {
    "package": "com.apptest" } // Same
```

3. Then find your SHA1 fingerprint using:

```bash
  npx expo prebuild
  cd android
  ./gradlew signingReport
```

It should appear under the first variant "debug". Add it to your firebase android project.

4. Follow firebase configuration and change build.gradle files as required.

5. Configure your android and ios simulators and then run the project with:

```bash
  npx expo run:android
  npx expo run:ios
```

## References

-   [Firebase](https://firebase.google.com/)
