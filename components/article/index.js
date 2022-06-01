import { useRecoilValue } from "recoil";
import { agendaState } from "../recoil/recoil";

const Article = () => {
  const article = useRecoilValue(agendaState);
  return (
    <div>
      <p>{article[0]?.article}</p>
    </div>
  );
};

export default Article;
