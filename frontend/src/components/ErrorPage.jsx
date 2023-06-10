import { useTranslation } from 'react-i18next';
import getRoute from '../routes.js';
import pathToErrorImg from '../assets/404notFound.svg';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={pathToErrorImg} />
      <h1 className="h4 text-muted">{t('errorPage.notFound')}</h1>
      <p className="text-muted">
        {t('errorPage.redirect')}
        {' '}
        <a href={getRoute.chatPagePath()}>{t('errorPage.toMainPage')}</a>
      </p>
    </div>
  );
};
export default ErrorPage;
