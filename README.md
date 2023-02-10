Steps to reacreate project:
1. npx react-native init react_native_project
2. cd react_native_project
3. npx react-native-windows-init --overwrite
4. npm install react-native-webview
5. Add `<WinUI2xVersion>2.8.0-prerelease.210927001</WinUI2xVersion>` to windows\ExperimentalFeatures.props PropertyGroup
6. Open the solution in Visual Studio to download the Nuget Package
7. npx react-native run-windows
