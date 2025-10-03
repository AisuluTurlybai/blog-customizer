import { useEffect, useState ,useRef} from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import {
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  type ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
   applied: ArticleStateType;
   onApply: (next: ArticleStateType) => void;
   onReset: () => void; 
   fixedOpen?: boolean;
  initialOpen?: boolean;
};

export const ArticleParamsForm = ({
  applied,
  onApply,
  onReset,
  fixedOpen = false,
  initialOpen = false,
}: ArticleParamsFormProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const open = fixedOpen ? true : isOpen;

  const asideRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open || fixedOpen) return;

    const onPointer = (e: MouseEvent | TouchEvent) => {
      const el = asideRef.current;
      if (!el) return;
      const target = e.target as Node;
      if (!el.contains(target)) {
        setIsOpen(false); 
      }
    };

    document.addEventListener('mousedown', onPointer);
    document.addEventListener('touchstart', onPointer);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('touchstart', onPointer);
    };
  }, [open, fixedOpen]);

  useEffect(() => {
    if (!open || fixedOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, fixedOpen]);

  const [draft, setDraft] = useState<ArticleStateType>(applied);

  useEffect(() => {
    setDraft(applied);
  }, [applied]);

  function update<K extends keyof ArticleStateType>(field: K, value: ArticleStateType[K]) {
    setDraft(prev => ({ ...prev, [field]: value }));
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onApply(draft);
  }

  const handleReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onReset();
  }

  const openPanelOnMouseDown = () => { if (!fixedOpen) setIsOpen(true); };
  const closePanelFromSelect = () => { if (!fixedOpen) setIsOpen(false); };


  return (
    <>
      {!fixedOpen && (
        <ArrowButton
          isOpen={open}
          onClick={() => { if (!fixedOpen) setIsOpen(v => !v); }}
        />
      )}

      <aside
        ref={asideRef} 
        className={clsx(styles.container, { [styles.container_open]: open })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <h2 className={styles.title}>Задайте параметры</h2>

          <div onMouseDownCapture={openPanelOnMouseDown}>
            <Select
              title="Шрифт"
              options={fontFamilyOptions}
              selected={draft.fontFamilyOption}
              onChange={(v) => update('fontFamilyOption', v)}
              onClose={closePanelFromSelect}
              placeholder="Выберите шрифт"
            />
          </div>

          <RadioGroup
            name="article-size"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={draft.fontSizeOption}
            onChange={(v) => update('fontSizeOption', v)}
          />

          <div onMouseDownCapture={openPanelOnMouseDown}>
            <Select
              title="Цвет шрифта"
              options={fontColors}
              selected={draft.fontColor}
              onChange={(v) => update('fontColor', v)}
              onClose={closePanelFromSelect}
              placeholder="Выберите цвет шрифта"
            />
          </div>

          <Separator />

          <div onMouseDownCapture={openPanelOnMouseDown}>
            <Select
              title="Цвет фона"
              options={backgroundColors}
              selected={draft.backgroundColor}
              onChange={(v) => update('backgroundColor', v)}
              onClose={closePanelFromSelect}
              placeholder="Выберите цвет фона"
            />
          </div>

          <div onMouseDownCapture={openPanelOnMouseDown}>
            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={draft.contentWidth}
              onChange={(v) => update('contentWidth', v)}
              onClose={closePanelFromSelect}
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