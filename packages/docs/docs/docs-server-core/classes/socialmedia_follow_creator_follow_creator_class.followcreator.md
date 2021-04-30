---
id: "socialmedia_follow_creator_follow_creator_class.followcreator"
title: "Class: FollowCreator"
sidebar_label: "FollowCreator"
custom_edit_url: null
hide_title: true
---

# Class: FollowCreator

[socialmedia/follow-creator/follow-creator.class](../modules/socialmedia_follow_creator_follow_creator_class.md).FollowCreator

A class for ARC Feed-bookmark service

## Hierarchy

* *Service*

  ↳ **FollowCreator**

## Constructors

### constructor

\+ **new FollowCreator**(`options`: *Partial*<SequelizeServiceOptions\>, `app`: Application): [*FollowCreator*](socialmedia_follow_creator_follow_creator_class.followcreator.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `options` | *Partial*<SequelizeServiceOptions\> |
| `app` | Application |

**Returns:** [*FollowCreator*](socialmedia_follow_creator_follow_creator_class.followcreator.md)

Overrides: Service.constructor

Defined in: [packages/server-core/src/socialmedia/follow-creator/follow-creator.class.ts:17](https://github.com/xr3ngine/xr3ngine/blob/2d83606b6/packages/server-core/src/socialmedia/follow-creator/follow-creator.class.ts#L17)

## Properties

### Model

• **Model**: *any*

Inherited from: Service.Model

Defined in: node_modules/feathers-sequelize/types/index.d.ts:11

___

### app

• **app**: Application

Defined in: [packages/server-core/src/socialmedia/follow-creator/follow-creator.class.ts:16](https://github.com/xr3ngine/xr3ngine/blob/2d83606b6/packages/server-core/src/socialmedia/follow-creator/follow-creator.class.ts#L16)

___

### docs

• **docs**: *any*

Defined in: [packages/server-core/src/socialmedia/follow-creator/follow-creator.class.ts:17](https://github.com/xr3ngine/xr3ngine/blob/2d83606b6/packages/server-core/src/socialmedia/follow-creator/follow-creator.class.ts#L17)

___

### options

• **options**: SequelizeServiceOptions

Inherited from: Service.options

Defined in: node_modules/feathers-sequelize/types/index.d.ts:12

## Accessors

### events

• get **events**(): *string*[]

**Returns:** *string*[]

Defined in: node_modules/@feathersjs/adapter-commons/lib/service.d.ts:86

___

### id

• get **id**(): *string*

**Returns:** *string*

Defined in: node_modules/@feathersjs/adapter-commons/lib/service.d.ts:85

## Methods

### \_create

▸ **_create**(`data`: *Partial*<any\> \| *Partial*<any\>[], `params?`: Params): *Promise*<any\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `data` | *Partial*<any\> \| *Partial*<any\>[] |
| `params?` | Params |

**Returns:** *Promise*<any\>

Inherited from: Service._create

Defined in: node_modules/feathers-sequelize/types/index.d.ts:20

___

### \_find

▸ **_find**(`params?`: Params): *Promise*<any\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `params?` | Params |

**Returns:** *Promise*<any\>

Inherited from: Service._find

Defined in: node_modules/feathers-sequelize/types/index.d.ts:18

___

### \_get

▸ **_get**(`id`: Id, `params?`: Params): *Promise*<any\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id` | Id |
| `params?` | Params |

**Returns:** *Promise*<any\>

Inherited from: Service._get

Defined in: node_modules/feathers-sequelize/types/index.d.ts:19

___

### \_patch

▸ **_patch**(`id`: NullableId, `data`: *Partial*<any\>, `params?`: Params): *Promise*<any\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id` | NullableId |
| `data` | *Partial*<any\> |
| `params?` | Params |

**Returns:** *Promise*<any\>

Inherited from: Service._patch

Defined in: node_modules/feathers-sequelize/types/index.d.ts:22

___

### \_remove

▸ **_remove**(`id`: NullableId, `params?`: Params): *Promise*<any\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id` | NullableId |
| `params?` | Params |

**Returns:** *Promise*<any\>

Inherited from: Service._remove

Defined in: node_modules/feathers-sequelize/types/index.d.ts:23

___

### \_update

▸ **_update**(`id`: NullableId, `data`: *any*, `params?`: Params): *Promise*<any\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id` | NullableId |
| `data` | *any* |
| `params?` | Params |

**Returns:** *Promise*<any\>

Inherited from: Service._update

Defined in: node_modules/feathers-sequelize/types/index.d.ts:21

___

### allowsMulti

▸ **allowsMulti**(`method`: *string*): *boolean*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `method` | *string* |

**Returns:** *boolean*

Inherited from: Service.allowsMulti

Defined in: node_modules/@feathersjs/adapter-commons/lib/service.d.ts:95

___

### create

▸ **create**(`data`: *any*, `params?`: Params): *Promise*<any\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `data` | *any* |
| `params?` | Params |

**Returns:** *Promise*<any\>

Overrides: Service.create

Defined in: [packages/server-core/src/socialmedia/follow-creator/follow-creator.class.ts:93](https://github.com/xr3ngine/xr3ngine/blob/2d83606b6/packages/server-core/src/socialmedia/follow-creator/follow-creator.class.ts#L93)

___

### filterQuery

▸ **filterQuery**(`params?`: Params, `opts?`: *any*): { [key: string]: *any*;  } & { `paginate`: ``false`` \| *Pick*<PaginationOptions, ``"max"``\> \| { `default?`: *number* ; `max?`: *number*  }  }

#### Parameters:

| Name | Type |
| :------ | :------ |
| `params?` | Params |
| `opts?` | *any* |

**Returns:** { [key: string]: *any*;  } & { `paginate`: ``false`` \| *Pick*<PaginationOptions, ``"max"``\> \| { `default?`: *number* ; `max?`: *number*  }  }

Inherited from: Service.filterQuery

Defined in: node_modules/@feathersjs/adapter-commons/lib/service.d.ts:87

___

### find

▸ **find**(`params`: Params): *Promise*<any\>

**`function`** find it is used to find specific users

#### Parameters:

| Name | Type |
| :------ | :------ |
| `params` | Params |

**Returns:** *Promise*<any\>

{@Array} of found users

Overrides: Service.find

Defined in: [packages/server-core/src/socialmedia/follow-creator/follow-creator.class.ts:31](https://github.com/xr3ngine/xr3ngine/blob/2d83606b6/packages/server-core/src/socialmedia/follow-creator/follow-creator.class.ts#L31)

___

### get

▸ **get**(`id`: Id, `params?`: Params): *Promise*<any\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id` | Id |
| `params?` | Params |

**Returns:** *Promise*<any\>

Inherited from: Service.get

Defined in: node_modules/@feathersjs/adapter-commons/lib/service.d.ts:97

___

### getModel

▸ **getModel**(`params`: Params): *any*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `params` | Params |

**Returns:** *any*

Inherited from: Service.getModel

Defined in: node_modules/feathers-sequelize/types/index.d.ts:16

___

### patch

▸ **patch**(`id`: NullableId, `data`: *Partial*<any\>, `params?`: Params): *Promise*<any\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id` | NullableId |
| `data` | *Partial*<any\> |
| `params?` | Params |

**Returns:** *Promise*<any\>

Inherited from: Service.patch

Defined in: node_modules/@feathersjs/adapter-commons/lib/service.d.ts:100

___

### remove

▸ **remove**(`followedCreatorId`: *string*, `params?`: Params): *Promise*<any\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `followedCreatorId` | *string* |
| `params?` | Params |

**Returns:** *Promise*<any\>

Overrides: Service.remove

Defined in: [packages/server-core/src/socialmedia/follow-creator/follow-creator.class.ts:101](https://github.com/xr3ngine/xr3ngine/blob/2d83606b6/packages/server-core/src/socialmedia/follow-creator/follow-creator.class.ts#L101)

___

### update

▸ **update**(`id`: Id, `data`: *any*, `params?`: Params): *Promise*<any\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `id` | Id |
| `data` | *any* |
| `params?` | Params |

**Returns:** *Promise*<any\>

Inherited from: Service.update

Defined in: node_modules/@feathersjs/adapter-commons/lib/service.d.ts:99