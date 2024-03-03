import { useEffect, useState } from "react";
// import SplashScreen from 'react-native-bootsplash';
// import * as SplashScreen from 'expo-splash-screen';
<<<<<<< HEAD
import codePush from "react-native-code-push";
=======
import codePush from 'react-native-code-push';
>>>>>>> master

const useCodePush = (isLoading) => {
  const [syncMessage, setSyncMessage] = useState();
  const [progress, setProgress] = useState();

  const syncStatusChangedCallback = (syncStatus) => {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        setSyncMessage("Checking for update...");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        setSyncMessage("Downloading update...");
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        setSyncMessage("User waiting...");
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        setSyncMessage("Loading update...");
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        setSyncMessage("The app is up to date...");
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        setSyncMessage("Update canceled by user...");
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        setSyncMessage("Update installed, Application restarting...");
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        setSyncMessage("An error occurred during the update...");
        break;
      default:
        setSyncMessage(undefined);
        break;
    }
  };

  const downloadProgressCallback = ({ receivedBytes, totalBytes }) => {
    const currentProgress = Math.round((receivedBytes / totalBytes) * 100);
    setProgress(`${currentProgress} %`);
  };

  useEffect(() => {
    if (!isLoading) {
<<<<<<< HEAD
      // SplashScreen.preventAutoHideAsync({ fade: true, duration: 360 });
=======
    SplashScreen.preventAutoHideAsync({ fade: true, duration: 360 });
>>>>>>> master
      if (!__DEV__) {
        codePush.notifyAppReady();
        codePush.checkForUpdate().then((update) => {
          if (update) {
            codePush.sync(
              { installMode: codePush.InstallMode.IMMEDIATE },
              syncStatusChangedCallback,
              downloadProgressCallback
            );
          }
        });
      }
    }
  }, [isLoading]);

  return {
    syncMessage,
    progress,
  };
};

export default useCodePush;

