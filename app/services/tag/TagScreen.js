import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import TagItem from "./TagItem";
import useAuth from "../../hooks/useAuth";
import AppTextError from "../../components/AppTextError";
import Styles from "../../resources/Styles";
import AppContent from "../../components/AppContent";

function TagScreen({ navigation: { navigate } }) {
  const { user } = useAuth();
  const [tags, setTags] = useState([]);

  const handleTagPress = (tag) => {
    navigate("Product", {
      title: tag.menuName.length > 15 ? tag.menuName.substring(0, 15) + '...' : tag.menuName,
      tagId: tag.tagId,
    });
  };
  useEffect(() => {
    const data = JSON.parse(user.dealerRole.menuData);
    setTags(data.menus);
  }, []);
  return (
    <AppContent>
      {tags && tags.length ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[Styles.p10]}
          numColumns={3}
          data={tags}
          keyExtractor={(item) => item.menuId.toString()}
          renderItem={({ item }) => (
            <TagItem
              name={item.menuName}
              onPress={() => handleTagPress(item)}
              tagId={item.tagId}
            />
          )}
        />
      ) : (
        <AppTextError>Цэс тохируулаагүй байна.</AppTextError>
      )}
    </AppContent>
  );
}

export default TagScreen;
