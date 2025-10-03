import { createRoot } from 'react-dom/client';
import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from 'components/article/Article';
import { ArticleParamsForm } from 'components/article-params-form/ArticleParamsForm';
import {
  defaultArticleState,
  type ArticleStateType,
} from 'src/constants/articleProps';


import styles from 'src/styles/index.module.scss';
import 'src/styles/index.scss';

 const App = () => {
  const [pageState, setPageState] = useState<ArticleStateType>(defaultArticleState);

  const handleApply = (next: ArticleStateType) => setPageState(next);
  const handleReset = () => setPageState(defaultArticleState);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': pageState.fontFamilyOption.value,
          '--font-size': pageState.fontSizeOption.value,
          '--font-color': pageState.fontColor.value,
          '--container-width': pageState.contentWidth.value,
          '--bg-color': pageState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        applied={pageState}
        onApply={handleApply}
        onReset={handleReset}
      />
      <Article />
    </main>
  );
};
export default App;