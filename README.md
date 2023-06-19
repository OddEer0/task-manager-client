## Перед началом

`git clone https://github.com/OddEer0/task-manager-client.git` - клонируем репозиторий

`git checkout develop` - переключаемся на ветку develop

`npm i` или `yarn install` - устанавливаем зависимости

`git checkout -b название_ветки` - создаем ветку для работы по таске

Если какие-то изменения надо стянуть с ветки develop, делаем `git pull origin develop`

## Команды для работы

- `dev` - запуск dev сервера проекта
- `build` - сборка прод версии проекта
- `start` - запуск прод сервера проекта
- `stylelint` - проверяем файлы стилей на синтаксические ошибки
- `stylelint:fix` - авто-исправление синтаксических ошибок в стилях
- `prettier` - форматер кода
- `prettier:fix` - форматирование всех файлов
- `lint` - проверка синтаксиса js/ts файлов
- `lint:fix` - авто-исправление синтаксических ошибок
- `test` - запуск тестов в режиме watch
- `coverage` - билдинг статистики покрытия тестов

## Во время разработки

```bash
yarn dev
yarn codegen:watch
```

## Перед пушем

- `npm run build` - проверяем исправность build сборки
	stylelint и eslint сделает проверку при коммите

## Структура файлов

- `file.spec.ts или file.test.ts` - файлы для тестирования
- `file.store.ts` - файл со стором
- `file.api.ts` - файл с api для стора
- `file.event.ts` - файл с event для стора
- `file.guard.ts` - файл гвардов для юнитов effector
- `file.hook.ts` - файл с хуками
- `file.const.ts` - файл с константами
- `file.helper.ts` - файл с хэлперами
- `file.config.ts` - файл конфигураций
- `file.provider.ts` - файл провайдера
- `file.mapper.ts` - файл маппинга данных
- `file.gql.ts` - файл graphql запроса
- `file.types.ts` - файл с типизацией
- `file.lazy.ts` - файл с ленивым отображением компонента
- `file.service.ts` - файл с сервисом

`Все расширения не объязательны, если находяться в директорий с именем расширения`

## Нейминг переменных

- `$name` - переменная effector стора
- `nameEvent` - переменная effector event`а
- `nameFx` - переменные эффекта в effector
- `$nameApi` - переменная api в effector
- `NAME` - переменная константы
- `StyledName` - переменная emotion компонентов
- `CustomName` - переменная кастомизированных ui через emotion

## Архитектура

Feature Sliced Design (FSD) - У него есть своя документация, рекомендую с ней ознакомиться
