import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import {
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  type ArticleStateType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

function applyCssVars(state: ArticleStateType) {
  const host = document.querySelector('main') as HTMLElement | null;
  if (!host) return;
  host.style.setProperty('--font-family', state.fontFamilyOption.value);
  host.style.setProperty('--font-size', state.fontSizeOption.value);
  host.style.setProperty('--font-color', state.fontColor.value);
  host.style.setProperty('--container-width', state.contentWidth.value);
  host.style.setProperty('--bg-color', state.backgroundColor.value);
}

export const ArticleParamsForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [applied, setApplied] = useState<ArticleStateType>(defaultArticleState);

  const [font, setFont] = useState(applied.fontFamilyOption);
  const [size, setSize] = useState(applied.fontSizeOption);
  const [fontColor, setFontColor] = useState(applied.fontColor);
  const [backgroundColor, setBackgroundColor] = useState(applied.backgroundColor);
  const [contentWidth, setContentWidth] = useState(applied.contentWidth);

  useEffect(() => {
    applyCssVars(defaultArticleState);
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const next: ArticleStateType = {
      fontFamilyOption: font,
      fontSizeOption: size,
      fontColor,
      backgroundColor,
      contentWidth,
    };

    applyCssVars(next);

    setApplied(next);
		setIsOpen(!isOpen);
  };

  const handleReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    applyCssVars(defaultArticleState);
    setApplied(defaultArticleState);
    setFont(defaultArticleState.fontFamilyOption);
    setSize(defaultArticleState.fontSizeOption);
    setFontColor(defaultArticleState.fontColor);
    setBackgroundColor(defaultArticleState.backgroundColor);
    setContentWidth(defaultArticleState.contentWidth);
		setIsOpen(!isOpen);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase dynamicLite>
            Задайте параметры
          </Text>

          <div onMouseDownCapture={() => setIsOpen(true)}>
            <Select
              title="Шрифт"
              options={fontFamilyOptions}
              selected={font}
              onChange={setFont}
              onClose={() => setIsOpen(false)}
              placeholder="Выберите шрифт"
            />
          </div>

          <div onMouseDownCapture={() => setIsOpen(true)}>
            <Select
              title="Цвет шрифта"
              options={fontColors}
              selected={fontColor}
              onChange={setFontColor}
              onClose={() => setIsOpen(false)}
              placeholder="Выберите цвет шрифта"
            />
          </div>

          <RadioGroup
            name="article-size"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={size}
            onChange={setSize}
          />

          <Separator />

          <div onMouseDownCapture={() => setIsOpen(true)}>
            <Select
              title="Цвет фона"
              options={backgroundColors}
              selected={backgroundColor}
              onChange={setBackgroundColor}
              onClose={() => setIsOpen(false)}
              placeholder="Выберите цвет фона"
            />
          </div>

          <div onMouseDownCapture={() => setIsOpen(true)}>
            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={contentWidth}
              onChange={setContentWidth}
              onClose={() => setIsOpen(false)}
              placeholder="Выберите ширину контента"
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};