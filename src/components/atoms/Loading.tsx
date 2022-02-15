import style from '@/components/atoms/loading.module.css';

export const Loading = () => {
  return (
    <div className={style.loadingWrapper}>
      <div className={style.loadingDualSpinner}>
        <div className={style.loading}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
