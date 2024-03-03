import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeparator from "../components/ListItemSeparator";
import AppScreen from "../components/AppScreen";

const initialMessages = [
  {
    id: 1,
    title: "Title1",
    description: "Description1",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "Title2",
    description: "Description2",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 3,
    title: "Title3",
    description: "Description3",
    image: require("../assets/mosh.jpg"),
  },
];
function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    //delete message from server
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <AppScreen>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 3,
              title: "Title3",
              description: "Description3",
              image: require("../assets/mosh.jpg"),
            },
          ]);
        }}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
