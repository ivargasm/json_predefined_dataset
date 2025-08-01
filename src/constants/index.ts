// src/constants/index.ts
import type { Variable, DatasetType } from '../types';

export const AVAILABLE_VARIABLES: Variable[] = [
    {
        var: 'placeIds',
        dsc: 'predefined.dataset.variable.place',
        filterType: '1',
        defaultAlias: 'dp',
        sql_include: 'and {alias}.place_id in ($ids)',
        sql_exclude: 'and {alias}.place_id not in ($ids)',
    },
    {
        var: 'chainIds',
        dsc: 'predefined.dataset.variable.chain',
        filterType: '2',
        defaultAlias: 'ch',
        sql_include: 'and {alias}.chain_id in ($ids)',
        sql_exclude: 'and {alias}.chain_id not in ($ids)',
    },
    {
        var: 'channelIds',
        dsc: 'predefined.dataset.variable.channel',
        filterType: '3',
        defaultAlias: 'chn',
        sql_include: 'and {alias}.channel_id in ($ids)',
        sql_exclude: 'and {alias}.channel_id not in ($ids)',
    },
    {
        var: 'formatIds',
        dsc: 'predefined.dataset.variable.format',
        filterType: '4',
        defaultAlias: 'f',
        sql_include: 'and {alias}.format_id in ($ids)',
        sql_exclude: 'and {alias}.format_id not in ($ids)',
    },
    {
        var: 'firstPlaceIds', // Asumiendo que FIRSTpl es First Place
        dsc: 'predefined.dataset.variable.first_place',
        filterType: '5',
        defaultAlias: 'fp',
        sql_include: 'and {alias}.first_place_id in ($ids)',
        sql_exclude: 'and {alias}.first_place_id not in ($ids)',
    },
    {
        var: 'profileIds',
        dsc: 'predefined.dataset.variable.profile',
        filterType: '6',
        defaultAlias: 'pf',
        sql_include: 'and {alias}.profile_id in ($ids)',
        sql_exclude: 'and {alias}.profile_id not in ($ids)',
    },
    {
        var: 'roleIds',
        dsc: 'predefined.dataset.variable.role',
        filterType: '7',
        defaultAlias: 'dr',
        sql_include: 'and {alias}.role_id in ($ids)',
        sql_exclude: 'and {alias}.role_id not in ($ids)',
    },
    {
        var: 'userIds',
        dsc: 'predefined.dataset.variable.user',
        filterType: '8',
        defaultAlias: 'u',
        sql_include: 'and {alias}.user_id in ($ids)',
        sql_exclude: 'and {alias}.user_id not in ($ids)',
    },
    {
        var: 'parentIds',
        dsc: 'predefined.dataset.variable.parent',
        filterType: '9',
        defaultAlias: 'p',
        sql_include: 'and {alias}.parent_id in ($ids)',
        sql_exclude: 'and {alias}.parent_id not in ($ids)',
    },
    {
        var: 'productIds',
        dsc: 'predefined.dataset.variable.product',
        filterType: '10',
        defaultAlias: 'dpv',
        sql_include: 'and {alias}.product_id in ($ids)',
        sql_exclude: 'and {alias}.product_id not in ($ids)',
    },
    {
        var: 'brandIds',
        dsc: 'predefined.dataset.variable.brand',
        filterType: '11',
        defaultAlias: 'db',
        sql_include: 'and {alias}.brand_id in ($ids)',
        sql_exclude: 'and {alias}.brand_id not in ($ids)',
    },
    {
        var: 'manufacturerIds',
        dsc: 'predefined.dataset.variable.manufacturer',
        filterType: '12',
        defaultAlias: 'dm',
        sql_include: 'and {alias}.manufacturer_id in ($ids)',
        sql_exclude: 'and {alias}.manufacturer_id not in ($ids)',
    },
    {
        var: 'segmentIds',
        dsc: 'predefined.dataset.variable.segment',
        filterType: '13',
        defaultAlias: 'ds',
        sql_include: 'and {alias}.segment_id in ($ids)',
        sql_exclude: 'and {alias}.segment_id not in ($ids)',
    },
    {
        var: 'subcategoryIds',
        dsc: 'predefined.dataset.variable.subcategory',
        filterType: '14',
        defaultAlias: 'dsc',
        sql_include: 'and {alias}.subcategory_id in ($ids)',
        sql_exclude: 'and {alias}.subcategory_id not in ($ids)',
    },
    {
        var: 'categoryIds',
        dsc: 'predefined.dataset.variable.category',
        filterType: '15',
        defaultAlias: 'dc',
        sql_include: 'and {alias}.category_id in ($ids)',
        sql_exclude: 'and {alias}.category_id not in ($ids)',
    },
    {
        var: 'projectIds',
        dsc: 'predefined.dataset.variable.project',
        filterType: '16',
        defaultAlias: 'dpj',
        sql_include: 'and {alias}.project_id in ($ids)',
        sql_exclude: 'and {alias}.project_id not in ($ids)',
    },
    {
        var: 'capturePlanIds',
        dsc: 'predefined.dataset.variable.capture_plan',
        filterType: '17',
        defaultAlias: 'dcp',
        sql_include: 'and {alias}.capture_plan_id in ($ids)',
        sql_exclude: 'and {alias}.capture_plan_id not in ($ids)',
    },
    {
        var: 'captureModuleIds',
        dsc: 'predefined.dataset.variable.capture_module',
        filterType: '18',
        defaultAlias: 'dcm',
        sql_include: 'and {alias}.capture_module_id in ($ids)',
        sql_exclude: 'and {alias}.capture_module_id not in ($ids)',
    },
    {
        var: 'captureElementIds',
        dsc: 'predefined.dataset.variable.capture_element',
        filterType: '19',
        defaultAlias: 'dce',
        sql_include: 'and {alias}.capture_element_id in ($ids)',
        sql_exclude: 'and {alias}.capture_element_id not in ($ids)',
    },
    {
        var: 'captureDataTypeIds',
        dsc: 'predefined.dataset.variable.capture_data_type',
        filterType: '20',
        defaultAlias: 'cdt',
        sql_include: 'and {alias}.capture_data_type_id in ($ids)',
        sql_exclude: 'and {alias}.capture_data_type_id not in ($ids)',
    },
    {
        var: 'captureExhibitionTypeIds',
        dsc: 'predefined.dataset.variable.capture_exhibition_type',
        filterType: '21',
        defaultAlias: 'cet',
        sql_include: 'and {alias}.capture_exhibition_type_id in ($ids)',
        sql_exclude: 'and {alias}.capture_exhibition_type_id not in ($ids)',
    },
    {
        var: 'captureLocationTypeIds',
        dsc: 'predefined.dataset.variable.capture_location_type',
        filterType: '22',
        defaultAlias: 'clt',
        sql_include: 'and {alias}.capture_location_type_id in ($ids)',
        sql_exclude: 'and {alias}.capture_location_type_id not in ($ids)',
    },
    {
        var: 'capturePromotionTypeIds',
        dsc: 'predefined.dataset.variable.capture_promotion_type',
        filterType: '23',
        defaultAlias: 'cpt',
        sql_include: 'and {alias}.capture_promotion_type_id in ($ids)',
        sql_exclude: 'and {alias}.capture_promotion_type_id not in ($ids)',
    },
    {
        var: 'capturePopTypeIds',
        dsc: 'predefined.dataset.variable.capture_pop_type',
        filterType: '24',
        defaultAlias: 'cpt',
        sql_include: 'and {alias}.capture_pop_type_id in ($ids)',
        sql_exclude: 'and {alias}.capture_pop_type_id not in ($ids)',
    },
    {
        var: 'countryIds',
        dsc: 'predefined.dataset.variable.country',
        filterType: '25',
        defaultAlias: 'dc',
        sql_include: 'and {alias}.country_id in ($ids)',
        sql_exclude: 'and {alias}.country_id not in ($ids)',
    },
    {
        var: 'productTagIds',
        dsc: 'predefined.dataset.variable.product_tag',
        filterType: '26',
        defaultAlias: 'dpt',
        sql_include: 'and {alias}.product_tag_id in ($ids)',
        sql_exclude: 'and {alias}.product_tag_id not in ($ids)',
    },
    {
        var: 'placeTagIds',
        dsc: 'predefined.dataset.variable.place_tag',
        filterType: '27',
        defaultAlias: 'dpt',
        sql_include: 'and {alias}.place_tag_id in ($ids)',
        sql_exclude: 'and {alias}.place_tag_id not in ($ids)',
    },
    {
        var: 'treeIds',
        dsc: 'predefined.dataset.variable.tree',
        filterType: '28',
        defaultAlias: 'dt',
        sql_include: 'and {alias}.tree_id in ($ids)',
        sql_exclude: 'and {alias}.tree_id not in ($ids)',
    },
    {
        var: 'fVisitPivotIds',
        dsc: 'predefined.dataset.variable.f_visit_pivot',
        filterType: '29',
        defaultAlias: 'fvp',
        sql_include: 'and {alias}.f_visit_pivot_id in ($ids)',
        sql_exclude: 'and {alias}.f_visit_pivot_id not in ($ids)',
    },
    {
        var: 'focusTaskIds',
        dsc: 'predefined.dataset.variable.focus_task',
        filterType: '30',
        defaultAlias: 'ft',
        sql_include: 'and {alias}.focus_task_id in ($ids)',
        sql_exclude: 'and {alias}.focus_task_id not in ($ids)',
    },
    {
        var: 'sectionIds',
        dsc: 'predefined.dataset.variable.section',
        filterType: '31',
        defaultAlias: 'ds',
        sql_include: 'and {alias}.section_id in ($ids)',
        sql_exclude: 'and {alias}.section_id not in ($ids)',
    },
    {
        var: 'focusTaskSectionIds',
        dsc: 'predefined.dataset.variable.focus_task_section',
        filterType: '32',
        defaultAlias: 'fts',
        sql_include: 'and {alias}.focus_task_section_id in ($ids)',
        sql_exclude: 'and {alias}.focus_task_section_id not in ($ids)',
    },
];

export const DATASET_TYPES: DatasetType[] = [
    { id: 10, dsci18n: "dataset.type.capture", description: "Datos de captura directa." },
    { id: 2, dsci18n: "dataset.type.visit", description: "Datos de visitas." },
    { id: 4, dsci18n: "dataset.type.role", description: "Dataset de Roles." },
    { id: 6, dsci18n: "dataset.type.place", description: "Dataset de Lugares." },
    { id: 8, dsci18n: "dataset.type.product", description: "Dataset de Productos." },
    { id: 106, dsci18n: "dataset.type.workplan", description: "Dataset de Planes de Trabajo." },
    { id: 139, dsci18n: "dataset.type.f.data.redshift", description: "Dataset Informacion HUB." },
];

export const DATA_TYPES: string[] = ['varchar', 'int', 'double', 'photo', 'date', 'boolean', 'datetime'];
