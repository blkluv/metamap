import {
  Article,
  Group,
  Store,
  Room,
  Chat,
  ReportGmailerrorred,
} from "@mui/icons-material";

interface TypeIconProps {
  type?: string;
}

const TypeIcon = ({ type }: TypeIconProps) => {
  const renderIcon = (type: string | undefined) => {
    if (type === "event") return <Room sx={{ marginRight: ".5rem" }} />;
    if (type === "post") return <Article sx={{ marginRight: ".5rem" }} />;
    if (type === "business") return <Store sx={{ marginRight: ".5rem" }} />;
    if (type === "social") return <Group sx={{ marginRight: ".5rem" }} />;
    if (type === "chat") return <Chat sx={{ marginRight: ".5rem" }} />;
    return <ReportGmailerrorred sx={{ marginRight: ".5rem" }} />;
  };

  return <>{renderIcon(type)}</>;
};

export default TypeIcon;
