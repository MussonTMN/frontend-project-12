import goTo from '../routes.js';
import pathToErrorImg from '../assets/404notFound.svg';

const ErrorPage = () => (
  <div className="text-center">
    <img alt="Страница не найдена" className="img-fluid h-25" src={pathToErrorImg} />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      {' '}
      <a href={goTo.chatPagePath()}>на главную страницу</a>
    </p>
  </div>
);

export default ErrorPage;
