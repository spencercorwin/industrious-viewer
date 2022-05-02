import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { ResultData, scrape } from "./utils";
import ClassInfo from "./ClassInfo";
import ErrorView from "./ErrorView";
import LastRefreshDate from "./LastRefreshDate";
import RefreshFailed from "./RefreshFailed";
import {
  Appbar,
  Button,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import AppLoadingView from "./AppLoadView";
import DonateButton from "./DonateButton";

interface LoadDataResult {
  readonly success: boolean;
  readonly data: ResultData[];
  readonly error?: string;
}

export default function App() {
  const [response, setResponse] = useState<ResultData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastRefreshDate, setLastRefreshDate] = useState<Date | undefined>();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshFailed, setRefreshFailed] = useState(false);

  const loadData = async (): Promise<LoadDataResult> => {
    try {
      const res = await scrape();

      return { success: true, data: res, error: undefined };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : String(error),
      };
    }
  };

  const onRefresh = useCallback(async () => {
    const { success, data } = await loadData();
    setRefreshFailed(false);
    if (success) {
      setLastRefreshDate(new Date());
      setResponse(data);
    } else {
      setRefreshFailed(true);
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { success, data, error } = await loadData();
      if (success) {
        setRefreshFailed(false);
        setLastRefreshDate(new Date());
        setResponse(data);
      } else {
        setErrorMessage(error as string);
        setIsError(true);
      }
      setIsLoading(false);
    })();
  }, []);

  const theme = {
    ...DefaultTheme,
  };

  return (
    <PaperProvider theme={theme}>
      {isLoading ? (
        <AppLoadingView />
      ) : isError ? (
        <ErrorView message={errorMessage} />
      ) : (
        <View style={styles.container}>
          <LastRefreshDate date={lastRefreshDate} />
          {refreshFailed ? <RefreshFailed /> : <></>}
          <FlatList
            data={response}
            renderItem={({ item }) => <ClassInfo data={item} />}
            keyExtractor={({ dateRaw }) => dateRaw}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
      <DonateButton />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
