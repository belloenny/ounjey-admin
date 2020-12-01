import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Json: any;
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CatererSignUpInput = {
  business_name: Scalars['String'];
  business_email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  business_phone?: Maybe<Scalars['String']>;
  tag_line?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type ImageInput = {
  path: Scalars['String'];
};

export type MenuItemCreateInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  vegetarian_option: Scalars['Boolean'];
  single_serves: Scalars['Int'];
  price_per_plate: Scalars['Int'];
  minimum_quantity: Scalars['Int'];
  maximum_quantity?: Maybe<Scalars['Int']>;
  image?: Maybe<ImageInput>;
  menu_options?: Maybe<MenuOptionCreateManyWithoutMenu_ItemInput>;
  menu_category?: Maybe<MenuCategoryCreateOneWithoutMenu_ItemsInput>;
};

export type UserSignUpInput = {
  first_name: Scalars['String'];
  last_name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['String'];
  address_1: Scalars['String'];
  address_2?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  country_code: Scalars['String'];
  state_or_province: Scalars['String'];
  belongs_to: CatererProfile;
};

export type CatererProfile = {
  __typename?: 'CatererProfile';
  user_id: Scalars['String'];
  business_name: Scalars['String'];
  business_email: Scalars['String'];
  business_phone?: Maybe<Scalars['String']>;
  tag_line?: Maybe<Scalars['String']>;
  is_approved: Scalars['Boolean'];
  cover_image?: Maybe<Scalars['String']>;
  addresses: Array<Address>;
  menu_categories: Array<MenuCategory>;
  menu_items: Array<MenuItem>;
};


export type CatererProfileAddressesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<AddressWhereUniqueInput>;
  after?: Maybe<AddressWhereUniqueInput>;
};


export type CatererProfileMenu_CategoriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<MenuCategoryWhereUniqueInput>;
  after?: Maybe<MenuCategoryWhereUniqueInput>;
};


export type CatererProfileMenu_ItemsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<MenuItemWhereUniqueInput>;
  after?: Maybe<MenuItemWhereUniqueInput>;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['String'];
  alt_description?: Maybe<Scalars['String']>;
  src: Scalars['String'];
  menu_item: MenuItem;
};

export type MenuCategory = {
  __typename?: 'MenuCategory';
  id: Scalars['String'];
  title: Scalars['String'];
  belongs_to: CatererProfile;
  menu_items: Array<MenuItem>;
};


export type MenuCategoryMenu_ItemsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<MenuItemWhereUniqueInput>;
  after?: Maybe<MenuItemWhereUniqueInput>;
};

export type MenuChoice = {
  __typename?: 'MenuChoice';
  id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  choice_price: Scalars['Int'];
  use_checkboxes: Scalars['Boolean'];
  menu_option: MenuOption;
};

export type MenuItem = {
  __typename?: 'MenuItem';
  id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  vegetarian_option: Scalars['Boolean'];
  single_serves: Scalars['Int'];
  price_per_plate: Scalars['Int'];
  maximum_quantity?: Maybe<Scalars['Int']>;
  minimum_quantity: Scalars['Int'];
  images: Array<Image>;
  menu_options: Array<MenuOption>;
  belongs_to?: Maybe<CatererProfile>;
  menu_category?: Maybe<MenuCategory>;
};


export type MenuItemImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ImageWhereUniqueInput>;
  after?: Maybe<ImageWhereUniqueInput>;
};


export type MenuItemMenu_OptionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<MenuOptionWhereUniqueInput>;
  after?: Maybe<MenuOptionWhereUniqueInput>;
};

export type MenuOption = {
  __typename?: 'MenuOption';
  id: Scalars['String'];
  title: Scalars['String'];
  minimum_choice: Scalars['Int'];
  maximum_choice?: Maybe<Scalars['Int']>;
  menu_item: MenuItem;
  menu_choices: Array<MenuChoice>;
};


export type MenuOptionMenu_ChoicesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<MenuChoiceWhereUniqueInput>;
  after?: Maybe<MenuChoiceWhereUniqueInput>;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  caterer_id: Scalars['String'];
  customer_phone: Scalars['String'];
  total_price: Scalars['Int'];
  total_quantity: Scalars['Int'];
  postal_code?: Maybe<Scalars['String']>;
  order_status: OrderStatus;
  user: User;
  customer_email: Scalars['String'];
  menu_items: Array<Scalars['Json']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  first_name: Scalars['String'];
  last_name?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
  role: UserRole;
  photo_url?: Maybe<Scalars['String']>;
};

export type AddressWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type MenuCategoryWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type MenuItemWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type ImageWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type MenuOptionWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type MenuChoiceWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}



export enum UserRole {
  Admin = 'ADMIN',
  Caterer = 'CATERER',
  User = 'USER'
}

export type MenuCategoryCreateInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  belongs_to: CatererProfileCreateOneWithoutMenu_CategoriesInput;
  menu_items?: Maybe<MenuItemCreateManyWithoutMenu_CategoryInput>;
};

export type MenuCategoryUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  belongs_to?: Maybe<CatererProfileUpdateOneRequiredWithoutMenu_CategoriesInput>;
  menu_items?: Maybe<MenuItemUpdateManyWithoutMenu_CategoryInput>;
};

export type MenuChoiceUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  choice_price?: Maybe<IntFieldUpdateOperationsInput>;
  use_checkboxes?: Maybe<BoolFieldUpdateOperationsInput>;
  menu_option?: Maybe<MenuOptionUpdateOneRequiredWithoutMenu_ChoicesInput>;
};

export type MenuItemUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  vegetarian_option?: Maybe<BoolFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  single_serves?: Maybe<IntFieldUpdateOperationsInput>;
  price_per_plate?: Maybe<IntFieldUpdateOperationsInput>;
  minimum_quantity?: Maybe<IntFieldUpdateOperationsInput>;
  maximum_quantity?: Maybe<NullableIntFieldUpdateOperationsInput>;
  belongs_to?: Maybe<CatererProfileUpdateOneWithoutMenu_ItemsInput>;
  menu_category?: Maybe<MenuCategoryUpdateOneWithoutMenu_ItemsInput>;
  images?: Maybe<ImageUpdateManyWithoutMenu_ItemInput>;
  menu_options?: Maybe<MenuOptionUpdateManyWithoutMenu_ItemInput>;
};

export type MenuOptionUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  minimum_choice?: Maybe<IntFieldUpdateOperationsInput>;
  maximum_choice?: Maybe<NullableIntFieldUpdateOperationsInput>;
  menu_item?: Maybe<MenuItemUpdateOneRequiredWithoutMenu_OptionsInput>;
  menu_choices?: Maybe<MenuChoiceUpdateManyWithoutMenu_OptionInput>;
};

export type CatererProfileWhereUniqueInput = {
  user_id?: Maybe<Scalars['String']>;
  business_email?: Maybe<Scalars['String']>;
};

export type MenuCategoryWhereInput = {
  AND?: Maybe<Array<Maybe<MenuCategoryWhereInput>>>;
  OR?: Maybe<Array<Maybe<MenuCategoryWhereInput>>>;
  NOT?: Maybe<Array<Maybe<MenuCategoryWhereInput>>>;
  id?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  caterer_id?: Maybe<StringFilter>;
  belongs_to?: Maybe<CatererProfileWhereInput>;
  menu_items?: Maybe<MenuItemListRelationFilter>;
};

export type CatererProfileCreateOneWithoutMenu_CategoriesInput = {
  create?: Maybe<CatererProfileCreateWithoutMenu_CategoriesInput>;
  connect?: Maybe<CatererProfileWhereUniqueInput>;
};

export type MenuItemCreateManyWithoutMenu_CategoryInput = {
  create?: Maybe<Array<Maybe<MenuItemCreateWithoutMenu_CategoryInput>>>;
  connect?: Maybe<Array<Maybe<MenuItemWhereUniqueInput>>>;
};

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type CatererProfileUpdateOneRequiredWithoutMenu_CategoriesInput = {
  create?: Maybe<CatererProfileCreateWithoutMenu_CategoriesInput>;
  connect?: Maybe<CatererProfileWhereUniqueInput>;
  update?: Maybe<CatererProfileUpdateWithoutMenu_CategoriesDataInput>;
  upsert?: Maybe<CatererProfileUpsertWithoutMenu_CategoriesInput>;
};

export type MenuItemUpdateManyWithoutMenu_CategoryInput = {
  create?: Maybe<Array<Maybe<MenuItemCreateWithoutMenu_CategoryInput>>>;
  connect?: Maybe<Array<Maybe<MenuItemWhereUniqueInput>>>;
  set?: Maybe<Array<Maybe<MenuItemWhereUniqueInput>>>;
  disconnect?: Maybe<Array<Maybe<MenuItemWhereUniqueInput>>>;
  delete?: Maybe<Array<Maybe<MenuItemWhereUniqueInput>>>;
  update?: Maybe<Array<Maybe<MenuItemUpdateWithWhereUniqueWithoutMenu_CategoryInput>>>;
  updateMany?: Maybe<Array<Maybe<MenuItemUpdateManyWithWhereNestedInput>>>;
  deleteMany?: Maybe<Array<Maybe<MenuItemScalarWhereInput>>>;
  upsert?: Maybe<Array<Maybe<MenuItemUpsertWithWhereUniqueWithoutMenu_CategoryInput>>>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type IntFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['Int']>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['Boolean']>;
};

export type MenuOptionUpdateOneRequiredWithoutMenu_ChoicesInput = {
  create?: Maybe<MenuOptionCreateWithoutMenu_ChoicesInput>;
  connect?: Maybe<MenuOptionWhereUniqueInput>;
  update?: Maybe<MenuOptionUpdateWithoutMenu_ChoicesDataInput>;
  upsert?: Maybe<MenuOptionUpsertWithoutMenu_ChoicesInput>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type NullableIntFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['Int']>;
};

export type CatererProfileUpdateOneWithoutMenu_ItemsInput = {
  create?: Maybe<CatererProfileCreateWithoutMenu_ItemsInput>;
  connect?: Maybe<CatererProfileWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<CatererProfileUpdateWithoutMenu_ItemsDataInput>;
  upsert?: Maybe<CatererProfileUpsertWithoutMenu_ItemsInput>;
};

export type MenuCategoryUpdateOneWithoutMenu_ItemsInput = {
  create?: Maybe<MenuCategoryCreateWithoutMenu_ItemsInput>;
  connect?: Maybe<MenuCategoryWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<MenuCategoryUpdateWithoutMenu_ItemsDataInput>;
  upsert?: Maybe<MenuCategoryUpsertWithoutMenu_ItemsInput>;
};

export type ImageUpdateManyWithoutMenu_ItemInput = {
  create?: Maybe<Array<Maybe<ImageCreateWithoutMenu_ItemInput>>>;
  connect?: Maybe<Array<Maybe<ImageWhereUniqueInput>>>;
  set?: Maybe<Array<Maybe<ImageWhereUniqueInput>>>;
  disconnect?: Maybe<Array<Maybe<ImageWhereUniqueInput>>>;
  delete?: Maybe<Array<Maybe<ImageWhereUniqueInput>>>;
  update?: Maybe<Array<Maybe<ImageUpdateWithWhereUniqueWithoutMenu_ItemInput>>>;
  updateMany?: Maybe<Array<Maybe<ImageUpdateManyWithWhereNestedInput>>>;
  deleteMany?: Maybe<Array<Maybe<ImageScalarWhereInput>>>;
  upsert?: Maybe<Array<Maybe<ImageUpsertWithWhereUniqueWithoutMenu_ItemInput>>>;
};

export type MenuOptionUpdateManyWithoutMenu_ItemInput = {
  create?: Maybe<Array<Maybe<MenuOptionCreateWithoutMenu_ItemInput>>>;
  connect?: Maybe<Array<Maybe<MenuOptionWhereUniqueInput>>>;
  set?: Maybe<Array<Maybe<MenuOptionWhereUniqueInput>>>;
  disconnect?: Maybe<Array<Maybe<MenuOptionWhereUniqueInput>>>;
  delete?: Maybe<Array<Maybe<MenuOptionWhereUniqueInput>>>;
  update?: Maybe<Array<Maybe<MenuOptionUpdateWithWhereUniqueWithoutMenu_ItemInput>>>;
  updateMany?: Maybe<Array<Maybe<MenuOptionUpdateManyWithWhereNestedInput>>>;
  deleteMany?: Maybe<Array<Maybe<MenuOptionScalarWhereInput>>>;
  upsert?: Maybe<Array<Maybe<MenuOptionUpsertWithWhereUniqueWithoutMenu_ItemInput>>>;
};

export type MenuItemUpdateOneRequiredWithoutMenu_OptionsInput = {
  create?: Maybe<MenuItemCreateWithoutMenu_OptionsInput>;
  connect?: Maybe<MenuItemWhereUniqueInput>;
  update?: Maybe<MenuItemUpdateWithoutMenu_OptionsDataInput>;
  upsert?: Maybe<MenuItemUpsertWithoutMenu_OptionsInput>;
};

export type MenuChoiceUpdateManyWithoutMenu_OptionInput = {
  create?: Maybe<Array<Maybe<MenuChoiceCreateWithoutMenu_OptionInput>>>;
  connect?: Maybe<Array<Maybe<MenuChoiceWhereUniqueInput>>>;
  set?: Maybe<Array<Maybe<MenuChoiceWhereUniqueInput>>>;
  disconnect?: Maybe<Array<Maybe<MenuChoiceWhereUniqueInput>>>;
  delete?: Maybe<Array<Maybe<MenuChoiceWhereUniqueInput>>>;
  update?: Maybe<Array<Maybe<MenuChoiceUpdateWithWhereUniqueWithoutMenu_OptionInput>>>;
  updateMany?: Maybe<Array<Maybe<MenuChoiceUpdateManyWithWhereNestedInput>>>;
  deleteMany?: Maybe<Array<Maybe<MenuChoiceScalarWhereInput>>>;
  upsert?: Maybe<Array<Maybe<MenuChoiceUpsertWithWhereUniqueWithoutMenu_OptionInput>>>;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
};

export type CatererProfileWhereInput = {
  AND?: Maybe<Array<Maybe<CatererProfileWhereInput>>>;
  OR?: Maybe<Array<Maybe<CatererProfileWhereInput>>>;
  NOT?: Maybe<Array<Maybe<CatererProfileWhereInput>>>;
  user_id?: Maybe<StringFilter>;
  business_name?: Maybe<StringFilter>;
  business_email?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  business_phone?: Maybe<StringNullableFilter>;
  tag_line?: Maybe<StringNullableFilter>;
  is_approved?: Maybe<BoolFilter>;
  cover_image?: Maybe<StringNullableFilter>;
  addresses?: Maybe<AddressListRelationFilter>;
  menu_categories?: Maybe<MenuCategoryListRelationFilter>;
  menu_items?: Maybe<MenuItemListRelationFilter>;
};

export type MenuItemListRelationFilter = {
  every?: Maybe<MenuItemWhereInput>;
  some?: Maybe<MenuItemWhereInput>;
  none?: Maybe<MenuItemWhereInput>;
};

export type CatererProfileCreateWithoutMenu_CategoriesInput = {
  user_id: Scalars['String'];
  business_name: Scalars['String'];
  business_email: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  business_phone?: Maybe<Scalars['String']>;
  tag_line?: Maybe<Scalars['String']>;
  is_approved?: Maybe<Scalars['Boolean']>;
  cover_image?: Maybe<Scalars['String']>;
  addresses?: Maybe<AddressCreateManyWithoutBelongs_ToInput>;
  menu_items?: Maybe<MenuItemCreateManyWithoutBelongs_ToInput>;
};

export type MenuItemCreateWithoutMenu_CategoryInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  vegetarian_option?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  single_serves: Scalars['Int'];
  price_per_plate: Scalars['Int'];
  minimum_quantity: Scalars['Int'];
  maximum_quantity?: Maybe<Scalars['Int']>;
  belongs_to?: Maybe<CatererProfileCreateOneWithoutMenu_ItemsInput>;
  images?: Maybe<ImageCreateManyWithoutMenu_ItemInput>;
  menu_options?: Maybe<MenuOptionCreateManyWithoutMenu_ItemInput>;
};

export type CatererProfileUpdateWithoutMenu_CategoriesDataInput = {
  user_id?: Maybe<StringFieldUpdateOperationsInput>;
  business_name?: Maybe<StringFieldUpdateOperationsInput>;
  business_email?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  business_phone?: Maybe<NullableStringFieldUpdateOperationsInput>;
  tag_line?: Maybe<NullableStringFieldUpdateOperationsInput>;
  is_approved?: Maybe<BoolFieldUpdateOperationsInput>;
  cover_image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  addresses?: Maybe<AddressUpdateManyWithoutBelongs_ToInput>;
  menu_items?: Maybe<MenuItemUpdateManyWithoutBelongs_ToInput>;
};

export type CatererProfileUpsertWithoutMenu_CategoriesInput = {
  update: CatererProfileUpdateWithoutMenu_CategoriesDataInput;
  create: CatererProfileCreateWithoutMenu_CategoriesInput;
};

export type MenuItemUpdateWithWhereUniqueWithoutMenu_CategoryInput = {
  where: MenuItemWhereUniqueInput;
  data: MenuItemUpdateWithoutMenu_CategoryDataInput;
};

export type MenuItemUpdateManyWithWhereNestedInput = {
  where: MenuItemScalarWhereInput;
  data: MenuItemUpdateManyDataInput;
};

export type MenuItemScalarWhereInput = {
  AND?: Maybe<Array<Maybe<MenuItemScalarWhereInput>>>;
  OR?: Maybe<Array<Maybe<MenuItemScalarWhereInput>>>;
  NOT?: Maybe<Array<Maybe<MenuItemScalarWhereInput>>>;
  id?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  description?: Maybe<StringNullableFilter>;
  vegetarian_option?: Maybe<BoolFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  single_serves?: Maybe<IntFilter>;
  price_per_plate?: Maybe<IntFilter>;
  minimum_quantity?: Maybe<IntFilter>;
  maximum_quantity?: Maybe<IntNullableFilter>;
  caterer_id?: Maybe<StringNullableFilter>;
  menu_category_id?: Maybe<StringNullableFilter>;
};

export type MenuItemUpsertWithWhereUniqueWithoutMenu_CategoryInput = {
  where: MenuItemWhereUniqueInput;
  update: MenuItemUpdateWithoutMenu_CategoryDataInput;
  create: MenuItemCreateWithoutMenu_CategoryInput;
};

export type MenuOptionCreateWithoutMenu_ChoicesInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  minimum_choice: Scalars['Int'];
  maximum_choice?: Maybe<Scalars['Int']>;
  menu_item: MenuItemCreateOneWithoutMenu_OptionsInput;
};

export type MenuOptionUpdateWithoutMenu_ChoicesDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  minimum_choice?: Maybe<IntFieldUpdateOperationsInput>;
  maximum_choice?: Maybe<NullableIntFieldUpdateOperationsInput>;
  menu_item?: Maybe<MenuItemUpdateOneRequiredWithoutMenu_OptionsInput>;
};

export type MenuOptionUpsertWithoutMenu_ChoicesInput = {
  update: MenuOptionUpdateWithoutMenu_ChoicesDataInput;
  create: MenuOptionCreateWithoutMenu_ChoicesInput;
};

export type CatererProfileCreateWithoutMenu_ItemsInput = {
  user_id: Scalars['String'];
  business_name: Scalars['String'];
  business_email: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  business_phone?: Maybe<Scalars['String']>;
  tag_line?: Maybe<Scalars['String']>;
  is_approved?: Maybe<Scalars['Boolean']>;
  cover_image?: Maybe<Scalars['String']>;
  addresses?: Maybe<AddressCreateManyWithoutBelongs_ToInput>;
  menu_categories?: Maybe<MenuCategoryCreateManyWithoutBelongs_ToInput>;
};

export type CatererProfileUpdateWithoutMenu_ItemsDataInput = {
  user_id?: Maybe<StringFieldUpdateOperationsInput>;
  business_name?: Maybe<StringFieldUpdateOperationsInput>;
  business_email?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  business_phone?: Maybe<NullableStringFieldUpdateOperationsInput>;
  tag_line?: Maybe<NullableStringFieldUpdateOperationsInput>;
  is_approved?: Maybe<BoolFieldUpdateOperationsInput>;
  cover_image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  addresses?: Maybe<AddressUpdateManyWithoutBelongs_ToInput>;
  menu_categories?: Maybe<MenuCategoryUpdateManyWithoutBelongs_ToInput>;
};

export type CatererProfileUpsertWithoutMenu_ItemsInput = {
  update: CatererProfileUpdateWithoutMenu_ItemsDataInput;
  create: CatererProfileCreateWithoutMenu_ItemsInput;
};

export type MenuCategoryCreateWithoutMenu_ItemsInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  belongs_to: CatererProfileCreateOneWithoutMenu_CategoriesInput;
};

export type MenuCategoryUpdateWithoutMenu_ItemsDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  belongs_to?: Maybe<CatererProfileUpdateOneRequiredWithoutMenu_CategoriesInput>;
};

export type MenuCategoryUpsertWithoutMenu_ItemsInput = {
  update: MenuCategoryUpdateWithoutMenu_ItemsDataInput;
  create: MenuCategoryCreateWithoutMenu_ItemsInput;
};

export type ImageCreateWithoutMenu_ItemInput = {
  id?: Maybe<Scalars['String']>;
  alt_description?: Maybe<Scalars['String']>;
  src: Scalars['String'];
};

export type ImageUpdateWithWhereUniqueWithoutMenu_ItemInput = {
  where: ImageWhereUniqueInput;
  data: ImageUpdateWithoutMenu_ItemDataInput;
};

export type ImageUpdateManyWithWhereNestedInput = {
  where: ImageScalarWhereInput;
  data: ImageUpdateManyDataInput;
};

export type ImageScalarWhereInput = {
  AND?: Maybe<Array<Maybe<ImageScalarWhereInput>>>;
  OR?: Maybe<Array<Maybe<ImageScalarWhereInput>>>;
  NOT?: Maybe<Array<Maybe<ImageScalarWhereInput>>>;
  id?: Maybe<StringFilter>;
  alt_description?: Maybe<StringNullableFilter>;
  src?: Maybe<StringFilter>;
  menu_item_id?: Maybe<StringFilter>;
};

export type ImageUpsertWithWhereUniqueWithoutMenu_ItemInput = {
  where: ImageWhereUniqueInput;
  update: ImageUpdateWithoutMenu_ItemDataInput;
  create: ImageCreateWithoutMenu_ItemInput;
};

export type MenuOptionCreateWithoutMenu_ItemInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  minimum_choice: Scalars['Int'];
  maximum_choice?: Maybe<Scalars['Int']>;
  menu_choices?: Maybe<MenuChoiceCreateManyWithoutMenu_OptionInput>;
};

export type MenuOptionUpdateWithWhereUniqueWithoutMenu_ItemInput = {
  where: MenuOptionWhereUniqueInput;
  data: MenuOptionUpdateWithoutMenu_ItemDataInput;
};

export type MenuOptionUpdateManyWithWhereNestedInput = {
  where: MenuOptionScalarWhereInput;
  data: MenuOptionUpdateManyDataInput;
};

export type MenuOptionScalarWhereInput = {
  AND?: Maybe<Array<Maybe<MenuOptionScalarWhereInput>>>;
  OR?: Maybe<Array<Maybe<MenuOptionScalarWhereInput>>>;
  NOT?: Maybe<Array<Maybe<MenuOptionScalarWhereInput>>>;
  id?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  minimum_choice?: Maybe<IntFilter>;
  maximum_choice?: Maybe<IntNullableFilter>;
  menu_item_id?: Maybe<StringFilter>;
};

export type MenuOptionUpsertWithWhereUniqueWithoutMenu_ItemInput = {
  where: MenuOptionWhereUniqueInput;
  update: MenuOptionUpdateWithoutMenu_ItemDataInput;
  create: MenuOptionCreateWithoutMenu_ItemInput;
};

export type MenuItemCreateWithoutMenu_OptionsInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  vegetarian_option?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  single_serves: Scalars['Int'];
  price_per_plate: Scalars['Int'];
  minimum_quantity: Scalars['Int'];
  maximum_quantity?: Maybe<Scalars['Int']>;
  belongs_to?: Maybe<CatererProfileCreateOneWithoutMenu_ItemsInput>;
  menu_category?: Maybe<MenuCategoryCreateOneWithoutMenu_ItemsInput>;
  images?: Maybe<ImageCreateManyWithoutMenu_ItemInput>;
};

export type MenuItemUpdateWithoutMenu_OptionsDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  vegetarian_option?: Maybe<BoolFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  single_serves?: Maybe<IntFieldUpdateOperationsInput>;
  price_per_plate?: Maybe<IntFieldUpdateOperationsInput>;
  minimum_quantity?: Maybe<IntFieldUpdateOperationsInput>;
  maximum_quantity?: Maybe<NullableIntFieldUpdateOperationsInput>;
  belongs_to?: Maybe<CatererProfileUpdateOneWithoutMenu_ItemsInput>;
  menu_category?: Maybe<MenuCategoryUpdateOneWithoutMenu_ItemsInput>;
  images?: Maybe<ImageUpdateManyWithoutMenu_ItemInput>;
};

export type MenuItemUpsertWithoutMenu_OptionsInput = {
  update: MenuItemUpdateWithoutMenu_OptionsDataInput;
  create: MenuItemCreateWithoutMenu_OptionsInput;
};

export type MenuChoiceCreateWithoutMenu_OptionInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  choice_price: Scalars['Int'];
  use_checkboxes?: Maybe<Scalars['Boolean']>;
};

export type MenuChoiceUpdateWithWhereUniqueWithoutMenu_OptionInput = {
  where: MenuChoiceWhereUniqueInput;
  data: MenuChoiceUpdateWithoutMenu_OptionDataInput;
};

export type MenuChoiceUpdateManyWithWhereNestedInput = {
  where: MenuChoiceScalarWhereInput;
  data: MenuChoiceUpdateManyDataInput;
};

export type MenuChoiceScalarWhereInput = {
  AND?: Maybe<Array<Maybe<MenuChoiceScalarWhereInput>>>;
  OR?: Maybe<Array<Maybe<MenuChoiceScalarWhereInput>>>;
  NOT?: Maybe<Array<Maybe<MenuChoiceScalarWhereInput>>>;
  id?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  description?: Maybe<StringNullableFilter>;
  choice_price?: Maybe<IntFilter>;
  use_checkboxes?: Maybe<BoolFilter>;
  menu_option_id?: Maybe<StringFilter>;
};

export type MenuChoiceUpsertWithWhereUniqueWithoutMenu_OptionInput = {
  where: MenuChoiceWhereUniqueInput;
  update: MenuChoiceUpdateWithoutMenu_OptionDataInput;
  create: MenuChoiceCreateWithoutMenu_OptionInput;
};

export type NestedStringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type StringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type BoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type AddressListRelationFilter = {
  every?: Maybe<AddressWhereInput>;
  some?: Maybe<AddressWhereInput>;
  none?: Maybe<AddressWhereInput>;
};

export type MenuCategoryListRelationFilter = {
  every?: Maybe<MenuCategoryWhereInput>;
  some?: Maybe<MenuCategoryWhereInput>;
  none?: Maybe<MenuCategoryWhereInput>;
};

export type MenuItemWhereInput = {
  AND?: Maybe<Array<Maybe<MenuItemWhereInput>>>;
  OR?: Maybe<Array<Maybe<MenuItemWhereInput>>>;
  NOT?: Maybe<Array<Maybe<MenuItemWhereInput>>>;
  id?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  description?: Maybe<StringNullableFilter>;
  vegetarian_option?: Maybe<BoolFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  single_serves?: Maybe<IntFilter>;
  price_per_plate?: Maybe<IntFilter>;
  minimum_quantity?: Maybe<IntFilter>;
  maximum_quantity?: Maybe<IntNullableFilter>;
  caterer_id?: Maybe<StringNullableFilter>;
  menu_category_id?: Maybe<StringNullableFilter>;
  belongs_to?: Maybe<CatererProfileWhereInput>;
  menu_category?: Maybe<MenuCategoryWhereInput>;
  images?: Maybe<ImageListRelationFilter>;
  menu_options?: Maybe<MenuOptionListRelationFilter>;
};

export type AddressCreateManyWithoutBelongs_ToInput = {
  create?: Maybe<Array<Maybe<AddressCreateWithoutBelongs_ToInput>>>;
  connect?: Maybe<Array<Maybe<AddressWhereUniqueInput>>>;
};

export type MenuItemCreateManyWithoutBelongs_ToInput = {
  create?: Maybe<Array<Maybe<MenuItemCreateWithoutBelongs_ToInput>>>;
  connect?: Maybe<Array<Maybe<MenuItemWhereUniqueInput>>>;
};

export type CatererProfileCreateOneWithoutMenu_ItemsInput = {
  create?: Maybe<CatererProfileCreateWithoutMenu_ItemsInput>;
  connect?: Maybe<CatererProfileWhereUniqueInput>;
};

export type ImageCreateManyWithoutMenu_ItemInput = {
  create?: Maybe<Array<Maybe<ImageCreateWithoutMenu_ItemInput>>>;
  connect?: Maybe<Array<Maybe<ImageWhereUniqueInput>>>;
};

export type MenuOptionCreateManyWithoutMenu_ItemInput = {
  create?: Maybe<Array<Maybe<MenuOptionCreateWithoutMenu_ItemInput>>>;
  connect?: Maybe<Array<Maybe<MenuOptionWhereUniqueInput>>>;
};

export type AddressUpdateManyWithoutBelongs_ToInput = {
  create?: Maybe<Array<Maybe<AddressCreateWithoutBelongs_ToInput>>>;
  connect?: Maybe<Array<Maybe<AddressWhereUniqueInput>>>;
  set?: Maybe<Array<Maybe<AddressWhereUniqueInput>>>;
  disconnect?: Maybe<Array<Maybe<AddressWhereUniqueInput>>>;
  delete?: Maybe<Array<Maybe<AddressWhereUniqueInput>>>;
  update?: Maybe<Array<Maybe<AddressUpdateWithWhereUniqueWithoutBelongs_ToInput>>>;
  updateMany?: Maybe<Array<Maybe<AddressUpdateManyWithWhereNestedInput>>>;
  deleteMany?: Maybe<Array<Maybe<AddressScalarWhereInput>>>;
  upsert?: Maybe<Array<Maybe<AddressUpsertWithWhereUniqueWithoutBelongs_ToInput>>>;
};

export type MenuItemUpdateManyWithoutBelongs_ToInput = {
  create?: Maybe<Array<Maybe<MenuItemCreateWithoutBelongs_ToInput>>>;
  connect?: Maybe<Array<Maybe<MenuItemWhereUniqueInput>>>;
  set?: Maybe<Array<Maybe<MenuItemWhereUniqueInput>>>;
  disconnect?: Maybe<Array<Maybe<MenuItemWhereUniqueInput>>>;
  delete?: Maybe<Array<Maybe<MenuItemWhereUniqueInput>>>;
  update?: Maybe<Array<Maybe<MenuItemUpdateWithWhereUniqueWithoutBelongs_ToInput>>>;
  updateMany?: Maybe<Array<Maybe<MenuItemUpdateManyWithWhereNestedInput>>>;
  deleteMany?: Maybe<Array<Maybe<MenuItemScalarWhereInput>>>;
  upsert?: Maybe<Array<Maybe<MenuItemUpsertWithWhereUniqueWithoutBelongs_ToInput>>>;
};

export type MenuItemUpdateWithoutMenu_CategoryDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  vegetarian_option?: Maybe<BoolFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  single_serves?: Maybe<IntFieldUpdateOperationsInput>;
  price_per_plate?: Maybe<IntFieldUpdateOperationsInput>;
  minimum_quantity?: Maybe<IntFieldUpdateOperationsInput>;
  maximum_quantity?: Maybe<NullableIntFieldUpdateOperationsInput>;
  belongs_to?: Maybe<CatererProfileUpdateOneWithoutMenu_ItemsInput>;
  images?: Maybe<ImageUpdateManyWithoutMenu_ItemInput>;
  menu_options?: Maybe<MenuOptionUpdateManyWithoutMenu_ItemInput>;
};

export type MenuItemUpdateManyDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  vegetarian_option?: Maybe<BoolFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  single_serves?: Maybe<IntFieldUpdateOperationsInput>;
  price_per_plate?: Maybe<IntFieldUpdateOperationsInput>;
  minimum_quantity?: Maybe<IntFieldUpdateOperationsInput>;
  maximum_quantity?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
};

export type IntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntNullableFilter>;
};

export type MenuItemCreateOneWithoutMenu_OptionsInput = {
  create?: Maybe<MenuItemCreateWithoutMenu_OptionsInput>;
  connect?: Maybe<MenuItemWhereUniqueInput>;
};

export type MenuCategoryCreateManyWithoutBelongs_ToInput = {
  create?: Maybe<Array<Maybe<MenuCategoryCreateWithoutBelongs_ToInput>>>;
  connect?: Maybe<Array<Maybe<MenuCategoryWhereUniqueInput>>>;
};

export type MenuCategoryUpdateManyWithoutBelongs_ToInput = {
  create?: Maybe<Array<Maybe<MenuCategoryCreateWithoutBelongs_ToInput>>>;
  connect?: Maybe<Array<Maybe<MenuCategoryWhereUniqueInput>>>;
  set?: Maybe<Array<Maybe<MenuCategoryWhereUniqueInput>>>;
  disconnect?: Maybe<Array<Maybe<MenuCategoryWhereUniqueInput>>>;
  delete?: Maybe<Array<Maybe<MenuCategoryWhereUniqueInput>>>;
  update?: Maybe<Array<Maybe<MenuCategoryUpdateWithWhereUniqueWithoutBelongs_ToInput>>>;
  updateMany?: Maybe<Array<Maybe<MenuCategoryUpdateManyWithWhereNestedInput>>>;
  deleteMany?: Maybe<Array<Maybe<MenuCategoryScalarWhereInput>>>;
  upsert?: Maybe<Array<Maybe<MenuCategoryUpsertWithWhereUniqueWithoutBelongs_ToInput>>>;
};

export type ImageUpdateWithoutMenu_ItemDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  alt_description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  src?: Maybe<StringFieldUpdateOperationsInput>;
};

export type ImageUpdateManyDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  alt_description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  src?: Maybe<StringFieldUpdateOperationsInput>;
};

export type MenuChoiceCreateManyWithoutMenu_OptionInput = {
  create?: Maybe<Array<Maybe<MenuChoiceCreateWithoutMenu_OptionInput>>>;
  connect?: Maybe<Array<Maybe<MenuChoiceWhereUniqueInput>>>;
};

export type MenuOptionUpdateWithoutMenu_ItemDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  minimum_choice?: Maybe<IntFieldUpdateOperationsInput>;
  maximum_choice?: Maybe<NullableIntFieldUpdateOperationsInput>;
  menu_choices?: Maybe<MenuChoiceUpdateManyWithoutMenu_OptionInput>;
};

export type MenuOptionUpdateManyDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  minimum_choice?: Maybe<IntFieldUpdateOperationsInput>;
  maximum_choice?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type MenuCategoryCreateOneWithoutMenu_ItemsInput = {
  create?: Maybe<MenuCategoryCreateWithoutMenu_ItemsInput>;
  connect?: Maybe<MenuCategoryWhereUniqueInput>;
};

export type MenuChoiceUpdateWithoutMenu_OptionDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  choice_price?: Maybe<IntFieldUpdateOperationsInput>;
  use_checkboxes?: Maybe<BoolFieldUpdateOperationsInput>;
};

export type MenuChoiceUpdateManyDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  choice_price?: Maybe<IntFieldUpdateOperationsInput>;
  use_checkboxes?: Maybe<BoolFieldUpdateOperationsInput>;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type NestedStringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type NestedBoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type AddressWhereInput = {
  AND?: Maybe<Array<Maybe<AddressWhereInput>>>;
  OR?: Maybe<Array<Maybe<AddressWhereInput>>>;
  NOT?: Maybe<Array<Maybe<AddressWhereInput>>>;
  id?: Maybe<StringFilter>;
  address_1?: Maybe<StringFilter>;
  address_2?: Maybe<StringNullableFilter>;
  country?: Maybe<StringFilter>;
  country_code?: Maybe<StringFilter>;
  state_or_province?: Maybe<StringFilter>;
  caterer_id?: Maybe<StringFilter>;
  belongs_to?: Maybe<CatererProfileWhereInput>;
};

export type ImageListRelationFilter = {
  every?: Maybe<ImageWhereInput>;
  some?: Maybe<ImageWhereInput>;
  none?: Maybe<ImageWhereInput>;
};

export type MenuOptionListRelationFilter = {
  every?: Maybe<MenuOptionWhereInput>;
  some?: Maybe<MenuOptionWhereInput>;
  none?: Maybe<MenuOptionWhereInput>;
};

export type AddressCreateWithoutBelongs_ToInput = {
  id?: Maybe<Scalars['String']>;
  address_1: Scalars['String'];
  address_2?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  country_code: Scalars['String'];
  state_or_province: Scalars['String'];
};

export type MenuItemCreateWithoutBelongs_ToInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  vegetarian_option?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  single_serves: Scalars['Int'];
  price_per_plate: Scalars['Int'];
  minimum_quantity: Scalars['Int'];
  maximum_quantity?: Maybe<Scalars['Int']>;
  menu_category?: Maybe<MenuCategoryCreateOneWithoutMenu_ItemsInput>;
  images?: Maybe<ImageCreateManyWithoutMenu_ItemInput>;
  menu_options?: Maybe<MenuOptionCreateManyWithoutMenu_ItemInput>;
};

export type AddressUpdateWithWhereUniqueWithoutBelongs_ToInput = {
  where: AddressWhereUniqueInput;
  data: AddressUpdateWithoutBelongs_ToDataInput;
};

export type AddressUpdateManyWithWhereNestedInput = {
  where: AddressScalarWhereInput;
  data: AddressUpdateManyDataInput;
};

export type AddressScalarWhereInput = {
  AND?: Maybe<Array<Maybe<AddressScalarWhereInput>>>;
  OR?: Maybe<Array<Maybe<AddressScalarWhereInput>>>;
  NOT?: Maybe<Array<Maybe<AddressScalarWhereInput>>>;
  id?: Maybe<StringFilter>;
  address_1?: Maybe<StringFilter>;
  address_2?: Maybe<StringNullableFilter>;
  country?: Maybe<StringFilter>;
  country_code?: Maybe<StringFilter>;
  state_or_province?: Maybe<StringFilter>;
  caterer_id?: Maybe<StringFilter>;
};

export type AddressUpsertWithWhereUniqueWithoutBelongs_ToInput = {
  where: AddressWhereUniqueInput;
  update: AddressUpdateWithoutBelongs_ToDataInput;
  create: AddressCreateWithoutBelongs_ToInput;
};

export type MenuItemUpdateWithWhereUniqueWithoutBelongs_ToInput = {
  where: MenuItemWhereUniqueInput;
  data: MenuItemUpdateWithoutBelongs_ToDataInput;
};

export type MenuItemUpsertWithWhereUniqueWithoutBelongs_ToInput = {
  where: MenuItemWhereUniqueInput;
  update: MenuItemUpdateWithoutBelongs_ToDataInput;
  create: MenuItemCreateWithoutBelongs_ToInput;
};

export type NestedIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
};

export type NestedIntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntNullableFilter>;
};

export type MenuCategoryCreateWithoutBelongs_ToInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  menu_items?: Maybe<MenuItemCreateManyWithoutMenu_CategoryInput>;
};

export type MenuCategoryUpdateWithWhereUniqueWithoutBelongs_ToInput = {
  where: MenuCategoryWhereUniqueInput;
  data: MenuCategoryUpdateWithoutBelongs_ToDataInput;
};

export type MenuCategoryUpdateManyWithWhereNestedInput = {
  where: MenuCategoryScalarWhereInput;
  data: MenuCategoryUpdateManyDataInput;
};

export type MenuCategoryScalarWhereInput = {
  AND?: Maybe<Array<Maybe<MenuCategoryScalarWhereInput>>>;
  OR?: Maybe<Array<Maybe<MenuCategoryScalarWhereInput>>>;
  NOT?: Maybe<Array<Maybe<MenuCategoryScalarWhereInput>>>;
  id?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  caterer_id?: Maybe<StringFilter>;
};

export type MenuCategoryUpsertWithWhereUniqueWithoutBelongs_ToInput = {
  where: MenuCategoryWhereUniqueInput;
  update: MenuCategoryUpdateWithoutBelongs_ToDataInput;
  create: MenuCategoryCreateWithoutBelongs_ToInput;
};

export type ImageWhereInput = {
  AND?: Maybe<Array<Maybe<ImageWhereInput>>>;
  OR?: Maybe<Array<Maybe<ImageWhereInput>>>;
  NOT?: Maybe<Array<Maybe<ImageWhereInput>>>;
  id?: Maybe<StringFilter>;
  alt_description?: Maybe<StringNullableFilter>;
  src?: Maybe<StringFilter>;
  menu_item_id?: Maybe<StringFilter>;
  menu_item?: Maybe<MenuItemWhereInput>;
};

export type MenuOptionWhereInput = {
  AND?: Maybe<Array<Maybe<MenuOptionWhereInput>>>;
  OR?: Maybe<Array<Maybe<MenuOptionWhereInput>>>;
  NOT?: Maybe<Array<Maybe<MenuOptionWhereInput>>>;
  id?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  minimum_choice?: Maybe<IntFilter>;
  maximum_choice?: Maybe<IntNullableFilter>;
  menu_item_id?: Maybe<StringFilter>;
  menu_item?: Maybe<MenuItemWhereInput>;
  menu_choices?: Maybe<MenuChoiceListRelationFilter>;
};

export type AddressUpdateWithoutBelongs_ToDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  address_1?: Maybe<StringFieldUpdateOperationsInput>;
  address_2?: Maybe<NullableStringFieldUpdateOperationsInput>;
  country?: Maybe<StringFieldUpdateOperationsInput>;
  country_code?: Maybe<StringFieldUpdateOperationsInput>;
  state_or_province?: Maybe<StringFieldUpdateOperationsInput>;
};

export type AddressUpdateManyDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  address_1?: Maybe<StringFieldUpdateOperationsInput>;
  address_2?: Maybe<NullableStringFieldUpdateOperationsInput>;
  country?: Maybe<StringFieldUpdateOperationsInput>;
  country_code?: Maybe<StringFieldUpdateOperationsInput>;
  state_or_province?: Maybe<StringFieldUpdateOperationsInput>;
};

export type MenuItemUpdateWithoutBelongs_ToDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  vegetarian_option?: Maybe<BoolFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  single_serves?: Maybe<IntFieldUpdateOperationsInput>;
  price_per_plate?: Maybe<IntFieldUpdateOperationsInput>;
  minimum_quantity?: Maybe<IntFieldUpdateOperationsInput>;
  maximum_quantity?: Maybe<NullableIntFieldUpdateOperationsInput>;
  menu_category?: Maybe<MenuCategoryUpdateOneWithoutMenu_ItemsInput>;
  images?: Maybe<ImageUpdateManyWithoutMenu_ItemInput>;
  menu_options?: Maybe<MenuOptionUpdateManyWithoutMenu_ItemInput>;
};

export type MenuCategoryUpdateWithoutBelongs_ToDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  menu_items?: Maybe<MenuItemUpdateManyWithoutMenu_CategoryInput>;
};

export type MenuCategoryUpdateManyDataInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
};

export type MenuChoiceListRelationFilter = {
  every?: Maybe<MenuChoiceWhereInput>;
  some?: Maybe<MenuChoiceWhereInput>;
  none?: Maybe<MenuChoiceWhereInput>;
};

export type MenuChoiceWhereInput = {
  AND?: Maybe<Array<Maybe<MenuChoiceWhereInput>>>;
  OR?: Maybe<Array<Maybe<MenuChoiceWhereInput>>>;
  NOT?: Maybe<Array<Maybe<MenuChoiceWhereInput>>>;
  id?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  description?: Maybe<StringNullableFilter>;
  choice_price?: Maybe<IntFilter>;
  use_checkboxes?: Maybe<BoolFilter>;
  menu_option_id?: Maybe<StringFilter>;
  menu_option?: Maybe<MenuOptionWhereInput>;
};

export type Query = {
  __typename?: 'Query';
  caterer?: Maybe<CatererProfile>;
  catererProfile?: Maybe<CatererProfile>;
  menuCategories: Array<MenuCategory>;
  menuItem?: Maybe<MenuItem>;
  me?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryCatererProfileArgs = {
  where: CatererProfileWhereUniqueInput;
};


export type QueryMenuCategoriesArgs = {
  where?: Maybe<MenuCategoryWhereInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<MenuCategoryWhereUniqueInput>;
  after?: Maybe<MenuCategoryWhereUniqueInput>;
};


export type QueryMenuItemArgs = {
  where: MenuItemWhereUniqueInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  signupCaterer?: Maybe<AuthPayload>;
  createMenu: MenuCategory;
  updateMenu?: Maybe<MenuCategory>;
  deleteOneMenuChoice?: Maybe<MenuChoice>;
  updateOneMenuChoice?: Maybe<MenuChoice>;
  createMenuItem?: Maybe<MenuItem>;
  updateItemPhoto?: Maybe<Image>;
  updateOneMenuItem?: Maybe<MenuItem>;
  deleteMenuItem?: Maybe<MenuItem>;
  deleteMenuOption?: Maybe<MenuOption>;
  updateMenuOption?: Maybe<MenuOption>;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
  loginOrSignUpOauth?: Maybe<AuthPayload>;
};


export type MutationSignupCatererArgs = {
  data?: Maybe<CatererSignUpInput>;
};


export type MutationCreateMenuArgs = {
  data: MenuCategoryCreateInput;
};


export type MutationUpdateMenuArgs = {
  data: MenuCategoryUpdateInput;
  where: MenuCategoryWhereUniqueInput;
};


export type MutationDeleteOneMenuChoiceArgs = {
  where: MenuChoiceWhereUniqueInput;
};


export type MutationUpdateOneMenuChoiceArgs = {
  data: MenuChoiceUpdateInput;
  where: MenuChoiceWhereUniqueInput;
};


export type MutationCreateMenuItemArgs = {
  data?: Maybe<MenuItemCreateInput>;
};


export type MutationUpdateItemPhotoArgs = {
  path: Scalars['String'];
  imageId: Scalars['ID'];
};


export type MutationUpdateOneMenuItemArgs = {
  data: MenuItemUpdateInput;
  where: MenuItemWhereUniqueInput;
};


export type MutationDeleteMenuItemArgs = {
  where?: Maybe<MenuChoiceWhereUniqueInput>;
};


export type MutationDeleteMenuOptionArgs = {
  where?: Maybe<MenuOptionWhereUniqueInput>;
};


export type MutationUpdateMenuOptionArgs = {
  data: MenuOptionUpdateInput;
  where: MenuOptionWhereUniqueInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  data?: Maybe<UserSignUpInput>;
};


export type MutationLoginOrSignUpOauthArgs = {
  idToken: Scalars['String'];
  provider: Scalars['String'];
};

export type CreateMenuMutationVariables = Exact<{
  title: Scalars['String'];
  user_id?: Maybe<Scalars['String']>;
}>;


export type CreateMenuMutation = (
  { __typename?: 'Mutation' }
  & { createMenu: (
    { __typename?: 'MenuCategory' }
    & Pick<MenuCategory, 'id'>
  ) }
);

export type CreateMenuItemWithMenuOptionsMutationVariables = Exact<{
  description?: Maybe<Scalars['String']>;
  image?: Maybe<ImageInput>;
  maximum_quantity?: Maybe<Scalars['Int']>;
  menu_options?: Maybe<Array<MenuOptionCreateWithoutMenu_ItemInput>>;
  minimum_quantity: Scalars['Int'];
  price_per_plate: Scalars['Int'];
  single_serves: Scalars['Int'];
  title: Scalars['String'];
  vegetarian_option?: Scalars['Boolean'];
  menu_category_id: Scalars['String'];
}>;


export type CreateMenuItemWithMenuOptionsMutation = (
  { __typename?: 'Mutation' }
  & { createMenuItem?: Maybe<(
    { __typename?: 'MenuItem' }
    & Pick<MenuItem, 'id'>
  )> }
);

export type CreateMenuItemMutationVariables = Exact<{
  description?: Maybe<Scalars['String']>;
  image?: Maybe<ImageInput>;
  maximum_quantity?: Maybe<Scalars['Int']>;
  minimum_quantity: Scalars['Int'];
  price_per_plate: Scalars['Int'];
  single_serves: Scalars['Int'];
  title: Scalars['String'];
  vegetarian_option?: Scalars['Boolean'];
  menu_category_id: Scalars['String'];
}>;


export type CreateMenuItemMutation = (
  { __typename?: 'Mutation' }
  & { createMenuItem?: Maybe<(
    { __typename?: 'MenuItem' }
    & Pick<MenuItem, 'id'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  )> }
);

export type SignUpCatererMutationVariables = Exact<{
  business_email: Scalars['String'];
  business_name: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  business_phone?: Maybe<Scalars['String']>;
  tag_line?: Maybe<Scalars['String']>;
  password: Scalars['String'];
}>;


export type SignUpCatererMutation = (
  { __typename?: 'Mutation' }
  & { signupCaterer?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  )> }
);

export type UpdateOneMenuItemMutationVariables = Exact<{
  updateOneMenuItemData: MenuItemUpdateInput;
  updateOneMenuItemWhere: MenuItemWhereUniqueInput;
}>;


export type UpdateOneMenuItemMutation = (
  { __typename?: 'Mutation' }
  & { updateOneMenuItem?: Maybe<(
    { __typename?: 'MenuItem' }
    & Pick<MenuItem, 'title' | 'single_serves' | 'price_per_plate' | 'id'>
  )> }
);

export type UpdateItemPhotoMutationVariables = Exact<{
  imageId: Scalars['ID'];
  path: Scalars['String'];
}>;


export type UpdateItemPhotoMutation = (
  { __typename?: 'Mutation' }
  & { updateItemPhoto?: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'src'>
  )> }
);

export type DeleteMenuMutationVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type DeleteMenuMutation = (
  { __typename?: 'Mutation' }
  & { deleteMenuItem?: Maybe<(
    { __typename?: 'MenuItem' }
    & Pick<MenuItem, 'id'>
  )> }
);

export type CatererQueryVariables = Exact<{ [key: string]: never; }>;


export type CatererQuery = (
  { __typename?: 'Query' }
  & { caterer?: Maybe<(
    { __typename?: 'CatererProfile' }
    & Pick<CatererProfile, 'user_id' | 'business_name' | 'business_email' | 'business_phone' | 'cover_image'>
  )> }
);

export type MenuItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type MenuItemsQuery = (
  { __typename?: 'Query' }
  & { caterer?: Maybe<(
    { __typename?: 'CatererProfile' }
    & { menu_items: Array<(
      { __typename?: 'MenuItem' }
      & Pick<MenuItem, 'id' | 'title' | 'description' | 'price_per_plate' | 'minimum_quantity' | 'single_serves' | 'maximum_quantity'>
      & { images: Array<(
        { __typename?: 'Image' }
        & Pick<Image, 'id' | 'src'>
      )>, menu_options: Array<(
        { __typename?: 'MenuOption' }
        & Pick<MenuOption, 'id' | 'title' | 'maximum_choice' | 'minimum_choice'>
        & { menu_choices: Array<(
          { __typename?: 'MenuChoice' }
          & Pick<MenuChoice, 'id' | 'name' | 'description' | 'choice_price' | 'use_checkboxes'>
        )> }
      )> }
    )> }
  )> }
);

export type CategoriesQueryVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { menuCategories: Array<(
    { __typename?: 'MenuCategory' }
    & Pick<MenuCategory, 'title'>
  )> }
);


export const CreateMenuDocument = gql`
    mutation CreateMenu($title: String!, $user_id: String) {
  createMenu(data: {title: $title, belongs_to: {connect: {user_id: $user_id}}}) {
    id
  }
}
    `;

export function useCreateMenuMutation() {
  return Urql.useMutation<CreateMenuMutation, CreateMenuMutationVariables>(CreateMenuDocument);
};
export const CreateMenuItemWithMenuOptionsDocument = gql`
    mutation CreateMenuItemWithMenuOptions($description: String, $image: ImageInput, $maximum_quantity: Int, $menu_options: [MenuOptionCreateWithoutMenu_itemInput!], $minimum_quantity: Int!, $price_per_plate: Int!, $single_serves: Int!, $title: String!, $vegetarian_option: Boolean! = false, $menu_category_id: String!) {
  createMenuItem(data: {image: $image, title: $title, description: $description, vegetarian_option: $vegetarian_option, single_serves: $single_serves, price_per_plate: $price_per_plate, minimum_quantity: $minimum_quantity, maximum_quantity: $maximum_quantity, menu_options: {create: $menu_options}, menu_category: {connect: {id: $menu_category_id}}}) {
    id
  }
}
    `;

export function useCreateMenuItemWithMenuOptionsMutation() {
  return Urql.useMutation<CreateMenuItemWithMenuOptionsMutation, CreateMenuItemWithMenuOptionsMutationVariables>(CreateMenuItemWithMenuOptionsDocument);
};
export const CreateMenuItemDocument = gql`
    mutation CreateMenuItem($description: String, $image: ImageInput, $maximum_quantity: Int, $minimum_quantity: Int!, $price_per_plate: Int!, $single_serves: Int!, $title: String!, $vegetarian_option: Boolean! = false, $menu_category_id: String!) {
  createMenuItem(data: {image: $image, title: $title, description: $description, vegetarian_option: $vegetarian_option, single_serves: $single_serves, price_per_plate: $price_per_plate, minimum_quantity: $minimum_quantity, maximum_quantity: $maximum_quantity, menu_category: {connect: {id: $menu_category_id}}}) {
    id
  }
}
    `;

export function useCreateMenuItemMutation() {
  return Urql.useMutation<CreateMenuItemMutation, CreateMenuItemMutationVariables>(CreateMenuItemDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const SignUpCatererDocument = gql`
    mutation SignUpCaterer($business_email: String!, $business_name: String!, $first_name: String!, $last_name: String!, $business_phone: String, $tag_line: String, $password: String!) {
  signupCaterer(data: {business_name: $business_name, business_email: $business_email, first_name: $first_name, last_name: $last_name, business_phone: $business_phone, tag_line: $tag_line, password: $password}) {
    token
    user {
      id
    }
  }
}
    `;

export function useSignUpCatererMutation() {
  return Urql.useMutation<SignUpCatererMutation, SignUpCatererMutationVariables>(SignUpCatererDocument);
};
export const UpdateOneMenuItemDocument = gql`
    mutation UpdateOneMenuItem($updateOneMenuItemData: MenuItemUpdateInput!, $updateOneMenuItemWhere: MenuItemWhereUniqueInput!) {
  updateOneMenuItem(data: $updateOneMenuItemData, where: $updateOneMenuItemWhere) {
    title
    single_serves
    price_per_plate
    id
  }
}
    `;

export function useUpdateOneMenuItemMutation() {
  return Urql.useMutation<UpdateOneMenuItemMutation, UpdateOneMenuItemMutationVariables>(UpdateOneMenuItemDocument);
};
export const UpdateItemPhotoDocument = gql`
    mutation UpdateItemPhoto($imageId: ID!, $path: String!) {
  updateItemPhoto(imageId: $imageId, path: $path) {
    src
  }
}
    `;

export function useUpdateItemPhotoMutation() {
  return Urql.useMutation<UpdateItemPhotoMutation, UpdateItemPhotoMutationVariables>(UpdateItemPhotoDocument);
};
export const DeleteMenuDocument = gql`
    mutation DeleteMenu($id: String) {
  deleteMenuItem(where: {id: $id}) {
    id
  }
}
    `;

export function useDeleteMenuMutation() {
  return Urql.useMutation<DeleteMenuMutation, DeleteMenuMutationVariables>(DeleteMenuDocument);
};
export const CatererDocument = gql`
    query Caterer {
  caterer {
    user_id
    business_name
    business_email
    business_phone
    cover_image
  }
}
    `;

export function useCatererQuery(options: Omit<Urql.UseQueryArgs<CatererQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CatererQuery>({ query: CatererDocument, ...options });
};
export const MenuItemsDocument = gql`
    query MenuItems {
  caterer {
    menu_items {
      id
      title
      images {
        id
        src
      }
      description
      price_per_plate
      minimum_quantity
      single_serves
      minimum_quantity
      maximum_quantity
      menu_options {
        id
        title
        maximum_choice
        minimum_choice
        menu_choices {
          id
          name
          description
          choice_price
          use_checkboxes
        }
      }
    }
  }
}
    `;

export function useMenuItemsQuery(options: Omit<Urql.UseQueryArgs<MenuItemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MenuItemsQuery>({ query: MenuItemsDocument, ...options });
};
export const CategoriesDocument = gql`
    query Categories($user_id: String!) {
  menuCategories(where: {belongs_to: {user_id: {in: [$user_id]}}}) {
    title
  }
}
    `;

export function useCategoriesQuery(options: Omit<Urql.UseQueryArgs<CategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CategoriesQuery>({ query: CategoriesDocument, ...options });
};