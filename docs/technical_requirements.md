# 1. Цель проекта

Цель проекта - разработать копию приложения Discord (далее Система). Пользователи могу коммуницировать между собой, как
в текстовом виде, так и в режиме реального времени в голосовых каналах.

# 2. Описание системы

Система состоит из следующих основных функциональных блоков:

1. Типы пользователей
2. Регистрация, аунтефикация и авторизация
3. Функционал пользователя
4. Виды чатов
5. Функционал взаимодействия с другими пользователями
6. Система уведомлений

## 2.1 Типы пользователей

Основный тип в Системе - это пользователь. При создания группы или сервера система предусматривает разделения
пользователя на два типа: админ и участник. Пользователь создавший группу или сервер является админом, пользователь
присоединившейся к группе или серверу является участником.

## 2.2 Регистрация, аунтефикация и авторизация

### 2.2.1 Регистрация

При регистрации должны быть переданы на вход следующие данные:

- email - обязательное поле
- nickname - обязательное поле
- пароль - обязательное поле
  После передачи выше описанных данных, пользователь должен перейти по ссылке подтверждения своего аккаунта,
  отправленной ему на электронную почту.

### 2.2.2 Аунтефикация

Аунтефикация пользователя осуществляется по email и паролю. Должна быть реализована возможность восстановления забытого
пароля. При запросе восстановления пароля необходимо на email пользователя прислать ссылку на страницу восстановления
пароля.
При переходе по этой ссылке пользователь должен иметь возможность задать новый пароль на вход.

## 2.3 Функционал пользователя

Username пользователя должен состоять из: username, введеного при регистрации и код из 4 цифр после username.
Уникальность поля, включает код.
Пользователь после аутентификации (ввода почты и пароля) получает доступ к своему фукционалу. Этот функционал состоит из
следующих блоков.

1. Редактирования данных профиля. Смена username, пароля и аватара
2. Отправка запроса в друзья другому пользователю
3. Изменение своего статуса активности. Должно быть реализовано четыре статуса:
   Online - пользователь недавно совершил какие-то действия и получает все уведомления
   Idle - пользователь неактивен(становится таким после 10 минут бездействия), но при этом приложение открыто в
   браузере, получает все уведомления
   Do not disturb - пользователь не получает уведомления и не может перейти в статус Idle, если бездействует более 10
   минут.
   Offline - получает все уведомления
   Статусы могу быть переключены вручную
4. Создание группы
5. Создание сервера

## 2.4 Виды чатов

Чаты в Системе могут быть 2ух видов:

### 2.4.1. Текстовый

Функционал:
Общедоступный функционал:

1. Отправка сообщений
2. Редактирование сообщения
3. Удаление сообщения
4. История чата
5. Закрепленные сообщения
6. Упоминание участника(@username), всех участников(@everyone)
7. Прикрепление файла к сообщению
   Функционал админа:
1. Удалить сообщение участника

### 2.4.2. Голосовой

Общедоступный функционал:

1. Начать звонок
2. Завершить звонок
3. Выключить микрофон
4. Поделиться экраном
5. Включить веб-камеру
6. Регулировать громкость участников (участник, может регулировать громкость других участников, только у себя в
   приложение)
7. Завершение звонка после 5 минут бездействия в пустом чате
   Функционал админа:
1. Выключить участнику микрофон (другие участники не смогу его слышать)
2. Отключить участника от звонка

## 2.5 Функционал взаимодействия с другими пользователями

Взаимодействиями между пользователями может происходить в трех сущностях:

### 2.5.1. Личные сообщения (Direct)

- Нет админа
- Максимальное количество пользователей- 2.
- Общий текстовый чат.
- Общий голосовой чат.

### 2.5.2. Группа (Group)

- Есть админ.
- Максимальное количество пользователей- 20.
- Общий текстовый чат.
- Общий голосовой чат.

### 2.5.3. Сервер (Server)

- Есть админ.
- Максимальное количество пользователей- 25000.
- Максимальное количество (и текстовых и голосовых) чатов - 500.
- Максимальное количество участников в голосовом канале - 100.
- Максимальное количество участников в голосовом канале - 25000.

### 2.5.4 Прочее

Возможность пригласить пользователя на сервер

## 2.6 Система уведомлений

Система уведомлений должна оповещать пользователя о действиях других пользователей по отношению к нему.
Система должна уведомлять о следующих событиях:

1. Входящий запрос в друзья
2. Принятие исходящего запроса
3. Получения сообщения от другого пользователя в Direct, Group и Server
4. Входящий звонок от другого пользователя в Direct и Group
5. Завершение звонка после 5 минут бездействия в пустом чате

# 3 Предлагаемый стек технологий

Для реализации системы предлагается следующий стек технологий:

* Бэкенд:
    - Язык JavaScript
    - Фреймворк Nest.js
    - БД PostgreSQL
    - Prisma ORM
    - Prisma migrate для миграций
* Фронтенд:
    - React
    - TypeScript
