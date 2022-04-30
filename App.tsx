import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { ResultData, scrape } from "./utils";
import ClassInfo from "./ClassInfo";
import Loading from "./Loading";
import LoadError from "./LoadError";
import LastRefreshDate from "./LastRefreshDate";

interface LoadDataResult {
  readonly success: boolean;
  readonly data: ResultData[];
  readonly error?: any;
}

export default function App() {
  const [response, setResponse] = useState<ResultData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastRefreshDate, setLastRefreshDate] = useState<Date | undefined>(); // TODO: grab from state on app load
  const [refreshing, setRefreshing] = useState(false);

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
    console.log("Attempting refresh");
    const { success, data } = await loadData();
    if (success) {
      setLastRefreshDate(new Date());
      setResponse(data);
    } else {
      console.log("Refresh failed");
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { success, data, error } = await loadData();
      setIsLoading(false);
      if (success) {
        setLastRefreshDate(new Date());
        setResponse(data);
      } else {
        setErrorMessage(error);
        setIsError(true);
      }
    })();
  }, []);

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <LoadError message={errorMessage} />
  ) : (
    <View style={styles.container}>
      <LastRefreshDate date={lastRefreshDate} />
      <FlatList
        data={response}
        renderItem={({ item }) => <ClassInfo data={item} />}
        keyExtractor={({ dateRaw }) => dateRaw}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
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
