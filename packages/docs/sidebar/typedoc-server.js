module.exports = [
  "docs-server/index",
  {
    "type": "category",
    "label": "Modules",
    "items": [
      "docs-server/modules/src",
      "docs-server/modules/src_app",
      "docs-server/modules/src_app_app_hooks",
      "docs-server/modules/src_app_authentication",
      "docs-server/modules/src_app_authentication_doc",
      "docs-server/modules/src_app_channels",
      "docs-server/modules/src_app_logger",
      "docs-server/modules/src_app_seeder_config",
      "docs-server/modules/src_app_sequelize",
      "docs-server/modules/src_config",
      "docs-server/modules/src_declarations",
      "docs-server/modules/src_enums_collection",
      "docs-server/modules/src_gameserver_webrtcgameserver",
      "docs-server/modules/src_gameserver_transports_client",
      "docs-server/modules/src_gameserver_transports_networkfunctions",
      "docs-server/modules/src_gameserver_transports_socketwebrtcservertransport",
      "docs-server/modules/src_gameserver_transports_webrtcfunctions",
      "docs-server/modules/src_gameserver_transports_config",
      "docs-server/modules/src_hooks_add_associations",
      "docs-server/modules/src_hooks_add_attribution",
      "docs-server/modules/src_hooks_add_thumbnail_file_id",
      "docs-server/modules/src_hooks_add_upload_path",
      "docs-server/modules/src_hooks_add_uri_to_file",
      "docs-server/modules/src_hooks_add_uuid",
      "docs-server/modules/src_hooks_channel_permission_authenticate",
      "docs-server/modules/src_hooks_check_party_instance_size",
      "docs-server/modules/src_hooks_collect_analytics",
      "docs-server/modules/src_hooks_convert_video",
      "docs-server/modules/src_hooks_create_group_owner",
      "docs-server/modules/src_hooks_create_owned_file",
      "docs-server/modules/src_hooks_create_party_owner",
      "docs-server/modules/src_hooks_create_static_resource",
      "docs-server/modules/src_hooks_generate_invite_passcode",
      "docs-server/modules/src_hooks_get_scene",
      "docs-server/modules/src_hooks_group_permission_authenticate",
      "docs-server/modules/src_hooks_group_user_permission_authenticate",
      "docs-server/modules/src_hooks_invite_remove_authenticate",
      "docs-server/modules/src_hooks_is_action",
      "docs-server/modules/src_hooks_limit_user_id",
      "docs-server/modules/src_hooks_log_request",
      "docs-server/modules/src_hooks_make_s3_files_public",
      "docs-server/modules/src_hooks_message_permission_authenticate",
      "docs-server/modules/src_hooks_party_permission_authenticate",
      "docs-server/modules/src_hooks_party_user_permission_authenticate",
      "docs-server/modules/src_hooks_reformat_upload_result",
      "docs-server/modules/src_hooks_remove_group_users",
      "docs-server/modules/src_hooks_remove_message_statuses",
      "docs-server/modules/src_hooks_remove_party_users",
      "docs-server/modules/src_hooks_remove_previous_thumbnail",
      "docs-server/modules/src_hooks_remove_related_resources",
      "docs-server/modules/src_hooks_replace_thumbnail_link",
      "docs-server/modules/src_hooks_restrict_user_role",
      "docs-server/modules/src_hooks_send_invite",
      "docs-server/modules/src_hooks_set_loggedin_user_in_body",
      "docs-server/modules/src_hooks_set_loggedin_user_in_query",
      "docs-server/modules/src_hooks_set_project_id_in_query",
      "docs-server/modules/src_hooks_set_resource_id_from_project",
      "docs-server/modules/src_hooks_set_response_status_code",
      "docs-server/modules/src_hooks_set_user_id",
      "docs-server/modules/src_hooks_unset_self_party_owner",
      "docs-server/modules/src_hooks_upload_thumbnail",
      "docs-server/modules/src_hooks_upload_thumbnail_link",
      "docs-server/modules/src_hooks_validatepresignedrequest",
      "docs-server/modules/src_middleware",
      "docs-server/modules/src_migrations_config",
      "docs-server/modules/src_models",
      "docs-server/modules/src_models_asset_model",
      "docs-server/modules/src_models_attribution_model",
      "docs-server/modules/src_models_channel_type_model",
      "docs-server/modules/src_models_channel_model",
      "docs-server/modules/src_models_collection_type_model",
      "docs-server/modules/src_models_collection_model",
      "docs-server/modules/src_models_comments_fires_model",
      "docs-server/modules/src_models_comments_model",
      "docs-server/modules/src_models_component_type_model",
      "docs-server/modules/src_models_component_model",
      "docs-server/modules/src_models_creator_model",
      "docs-server/modules/src_models_entity_model",
      "docs-server/modules/src_models_feed_bookmark_model",
      "docs-server/modules/src_models_feed_fires_model",
      "docs-server/modules/src_models_feed_model",
      "docs-server/modules/src_models_gameserver_subdomain_provision_model",
      "docs-server/modules/src_models_group_user_rank_model",
      "docs-server/modules/src_models_group_user_model",
      "docs-server/modules/src_models_group_model",
      "docs-server/modules/src_models_identity_provider_model",
      "docs-server/modules/src_models_instance_model",
      "docs-server/modules/src_models_invite_type_model",
      "docs-server/modules/src_models_invite_model",
      "docs-server/modules/src_models_license_model",
      "docs-server/modules/src_models_location_admin_model",
      "docs-server/modules/src_models_location_ban_model",
      "docs-server/modules/src_models_location_settings_model",
      "docs-server/modules/src_models_location_type_model",
      "docs-server/modules/src_models_location_model",
      "docs-server/modules/src_models_login_token_model",
      "docs-server/modules/src_models_message_status_model",
      "docs-server/modules/src_models_message_model",
      "docs-server/modules/src_models_owned_file_model",
      "docs-server/modules/src_models_party_user_model",
      "docs-server/modules/src_models_party_model",
      "docs-server/modules/src_models_project_asset_model",
      "docs-server/modules/src_models_rtc_ports_model",
      "docs-server/modules/src_models_scene_listing_model",
      "docs-server/modules/src_models_scene_model",
      "docs-server/modules/src_models_seat_status_model",
      "docs-server/modules/src_models_seat_model",
      "docs-server/modules/src_models_static_resource_type_model",
      "docs-server/modules/src_models_static_resource_model",
      "docs-server/modules/src_models_subscription_level_model",
      "docs-server/modules/src_models_subscription_type_model",
      "docs-server/modules/src_models_subscription_model",
      "docs-server/modules/src_models_tag_model",
      "docs-server/modules/src_models_user_relationship_type_model",
      "docs-server/modules/src_models_user_relationship_model",
      "docs-server/modules/src_models_user_role_model",
      "docs-server/modules/src_models_user_settings_model",
      "docs-server/modules/src_models_user_model",
      "docs-server/modules/src_scenes_templates",
      "docs-server/modules/src_services",
      "docs-server/modules/src_services_accept_invite_accept_invite_class",
      "docs-server/modules/src_services_accept_invite_accept_invite_hooks",
      "docs-server/modules/src_services_accept_invite_accept_invite_service",
      "docs-server/modules/src_services_attribution_attribution_class",
      "docs-server/modules/src_services_attribution_attribution_docs",
      "docs-server/modules/src_services_attribution_attribution_hooks",
      "docs-server/modules/src_services_attribution_attribution_service",
      "docs-server/modules/src_services_auth_management_auth_management_class",
      "docs-server/modules/src_services_auth_management_auth_management_hooks",
      "docs-server/modules/src_services_auth_management_auth_management_notifier",
      "docs-server/modules/src_services_auth_management_auth_management_service",
      "docs-server/modules/src_services_auth_management_auth_management_utils",
      "docs-server/modules/src_services_channel_type_channel_type_class",
      "docs-server/modules/src_services_channel_type_channel_type_docs",
      "docs-server/modules/src_services_channel_type_channel_type_hooks",
      "docs-server/modules/src_services_channel_type_channel_type_seed",
      "docs-server/modules/src_services_channel_type_channel_type_service",
      "docs-server/modules/src_services_channel_channel_class",
      "docs-server/modules/src_services_channel_channel_docs",
      "docs-server/modules/src_services_channel_channel_hooks",
      "docs-server/modules/src_services_channel_channel_service",
      "docs-server/modules/src_services_collection_type_collection_type_class",
      "docs-server/modules/src_services_collection_type_collection_type_docs",
      "docs-server/modules/src_services_collection_type_collection_type_hooks",
      "docs-server/modules/src_services_collection_type_collection_type_seed",
      "docs-server/modules/src_services_collection_type_collection_type_service",
      "docs-server/modules/src_services_collection_collection_class",
      "docs-server/modules/src_services_collection_collection_docs",
      "docs-server/modules/src_services_collection_collection_hooks",
      "docs-server/modules/src_services_collection_collection_seed",
      "docs-server/modules/src_services_collection_collection_service",
      "docs-server/modules/src_services_comments_fires_comments_fires_class",
      "docs-server/modules/src_services_comments_fires_comments_fires_docs",
      "docs-server/modules/src_services_comments_fires_comments_fires_hooks",
      "docs-server/modules/src_services_comments_fires_comments_fires_service",
      "docs-server/modules/src_services_comments_comments_class",
      "docs-server/modules/src_services_comments_comments_docs",
      "docs-server/modules/src_services_comments_comments_hooks",
      "docs-server/modules/src_services_comments_comments_service",
      "docs-server/modules/src_services_component_type_component_type_class",
      "docs-server/modules/src_services_component_type_component_type_docs",
      "docs-server/modules/src_services_component_type_component_type_hooks",
      "docs-server/modules/src_services_component_type_component_type_seed",
      "docs-server/modules/src_services_component_type_component_type_service",
      "docs-server/modules/src_services_component_type_service",
      "docs-server/modules/src_services_component_component_class",
      "docs-server/modules/src_services_component_component_docs",
      "docs-server/modules/src_services_component_component_hooks",
      "docs-server/modules/src_services_component_component_seed",
      "docs-server/modules/src_services_component_component_service",
      "docs-server/modules/src_services_creator_creator_class",
      "docs-server/modules/src_services_creator_creator_docs",
      "docs-server/modules/src_services_creator_creator_hooks",
      "docs-server/modules/src_services_creator_creator_service",
      "docs-server/modules/src_services_email_email",
      "docs-server/modules/src_services_email_email_class",
      "docs-server/modules/src_services_email_email_docs",
      "docs-server/modules/src_services_email_email_hooks",
      "docs-server/modules/src_services_email_email_service",
      "docs-server/modules/src_services_entity_entity_class",
      "docs-server/modules/src_services_entity_entity_docs",
      "docs-server/modules/src_services_entity_entity_hooks",
      "docs-server/modules/src_services_entity_entity_seed",
      "docs-server/modules/src_services_entity_entity_service",
      "docs-server/modules/src_services_feed_bookmark_feed_bookmark_class",
      "docs-server/modules/src_services_feed_bookmark_feed_bookmark_docs",
      "docs-server/modules/src_services_feed_bookmark_feed_bookmark_hooks",
      "docs-server/modules/src_services_feed_bookmark_feed_bookmark_service",
      "docs-server/modules/src_services_feed_fires_feed_fires_class",
      "docs-server/modules/src_services_feed_fires_feed_fires_docs",
      "docs-server/modules/src_services_feed_fires_feed_fires_hooks",
      "docs-server/modules/src_services_feed_fires_feed_fires_service",
      "docs-server/modules/src_services_feed_feed_class",
      "docs-server/modules/src_services_feed_feed_docs",
      "docs-server/modules/src_services_feed_feed_hooks",
      "docs-server/modules/src_services_feed_feed_seed",
      "docs-server/modules/src_services_feed_feed_service",
      "docs-server/modules/src_services_gameserver_subdomain_provision_gameserver_subdomain_provision_docs",
      "docs-server/modules/src_services_gameserver_subdomain_provision_gameserver_subdomain_provision_class",
      "docs-server/modules/src_services_gameserver_subdomain_provision_gameserver_subdomain_provision_hooks",
      "docs-server/modules/src_services_gameserver_subdomain_provision_gameserver_subdomain_provision_service",
      "docs-server/modules/src_services_graphql_graphql_class",
      "docs-server/modules/src_services_graphql_graphql_hooks",
      "docs-server/modules/src_services_graphql_graphql_service",
      "docs-server/modules/src_services_group_user_rank_group_user_rank_class",
      "docs-server/modules/src_services_group_user_rank_group_user_rank_docs",
      "docs-server/modules/src_services_group_user_rank_group_user_rank_hooks",
      "docs-server/modules/src_services_group_user_rank_group_user_rank_seed",
      "docs-server/modules/src_services_group_user_rank_group_user_rank_service",
      "docs-server/modules/src_services_group_user_group_user_class",
      "docs-server/modules/src_services_group_user_group_user_docs",
      "docs-server/modules/src_services_group_user_group_user_hooks",
      "docs-server/modules/src_services_group_user_group_user_service",
      "docs-server/modules/src_services_group_group_class",
      "docs-server/modules/src_services_group_group_docs",
      "docs-server/modules/src_services_group_group_hooks",
      "docs-server/modules/src_services_group_group_service",
      "docs-server/modules/src_services_identity_provider_identity_provider_class",
      "docs-server/modules/src_services_identity_provider_identity_provider_docs",
      "docs-server/modules/src_services_identity_provider_identity_provider_hooks",
      "docs-server/modules/src_services_identity_provider_identity_provider_service",
      "docs-server/modules/src_services_instance_provision_instance_provision_class",
      "docs-server/modules/src_services_instance_provision_instance_provision_docs",
      "docs-server/modules/src_services_instance_provision_instance_provision_hooks",
      "docs-server/modules/src_services_instance_provision_instance_provision_service",
      "docs-server/modules/src_services_instance_instance_class",
      "docs-server/modules/src_services_instance_instance_docs",
      "docs-server/modules/src_services_instance_instance_hooks",
      "docs-server/modules/src_services_instance_instance_service",
      "docs-server/modules/src_services_invite_type_invite_type_class",
      "docs-server/modules/src_services_invite_type_invite_type_docs",
      "docs-server/modules/src_services_invite_type_invite_type_hooks",
      "docs-server/modules/src_services_invite_type_invite_type_seed",
      "docs-server/modules/src_services_invite_type_invite_type_service",
      "docs-server/modules/src_services_invite_invite_class",
      "docs-server/modules/src_services_invite_invite_docs",
      "docs-server/modules/src_services_invite_invite_hooks",
      "docs-server/modules/src_services_invite_invite_service",
      "docs-server/modules/src_services_license_license_class",
      "docs-server/modules/src_services_license_license_docs",
      "docs-server/modules/src_services_license_license_hooks",
      "docs-server/modules/src_services_license_license_service",
      "docs-server/modules/src_services_location_admin_location_admin_class",
      "docs-server/modules/src_services_location_admin_location_admin_docs",
      "docs-server/modules/src_services_location_admin_location_admin_hooks",
      "docs-server/modules/src_services_location_admin_location_admin_service",
      "docs-server/modules/src_services_location_ban_location_ban_class",
      "docs-server/modules/src_services_location_ban_location_ban_docs",
      "docs-server/modules/src_services_location_ban_location_ban_hooks",
      "docs-server/modules/src_services_location_ban_location_ban_service",
      "docs-server/modules/src_services_location_settings_location_settings_docs",
      "docs-server/modules/src_services_location_settings_location_settings_class",
      "docs-server/modules/src_services_location_settings_location_settings_hooks",
      "docs-server/modules/src_services_location_settings_location_settings_seed",
      "docs-server/modules/src_services_location_settings_location_settings_service",
      "docs-server/modules/src_services_location_type_location_type_class",
      "docs-server/modules/src_services_location_type_location_type_docs",
      "docs-server/modules/src_services_location_type_location_type_hooks",
      "docs-server/modules/src_services_location_type_location_type_seed",
      "docs-server/modules/src_services_location_type_location_type_service",
      "docs-server/modules/src_services_location_location_class",
      "docs-server/modules/src_services_location_location_docs",
      "docs-server/modules/src_services_location_location_hooks",
      "docs-server/modules/src_services_location_location_seed",
      "docs-server/modules/src_services_location_location_service",
      "docs-server/modules/src_services_login_token_login_token_class",
      "docs-server/modules/src_services_login_token_login_token_docs",
      "docs-server/modules/src_services_login_token_login_token_hooks",
      "docs-server/modules/src_services_login_token_login_token_service",
      "docs-server/modules/src_services_login_login_class",
      "docs-server/modules/src_services_login_login_docs",
      "docs-server/modules/src_services_login_login_hooks",
      "docs-server/modules/src_services_login_login_service",
      "docs-server/modules/src_services_magic_link_magic_link_class",
      "docs-server/modules/src_services_magic_link_magic_link_docs",
      "docs-server/modules/src_services_magic_link_magic_link_hooks",
      "docs-server/modules/src_services_magic_link_magic_link_service",
      "docs-server/modules/src_services_media_search_media_search_class",
      "docs-server/modules/src_services_media_search_media_search_docs",
      "docs-server/modules/src_services_media_search_media_search_hooks",
      "docs-server/modules/src_services_media_search_media_search_service",
      "docs-server/modules/src_services_message_status_message_status_class",
      "docs-server/modules/src_services_message_status_message_status_docs",
      "docs-server/modules/src_services_message_status_message_status_hooks",
      "docs-server/modules/src_services_message_status_message_status_seed",
      "docs-server/modules/src_services_message_status_message_status_service",
      "docs-server/modules/src_services_message_message_class",
      "docs-server/modules/src_services_message_message_docs",
      "docs-server/modules/src_services_message_message_hooks",
      "docs-server/modules/src_services_message_message_service",
      "docs-server/modules/src_services_meta_meta_class",
      "docs-server/modules/src_services_meta_meta_docs",
      "docs-server/modules/src_services_meta_meta_hooks",
      "docs-server/modules/src_services_meta_meta_service",
      "docs-server/modules/src_services_party_user_party_user_class",
      "docs-server/modules/src_services_party_user_party_user_docs",
      "docs-server/modules/src_services_party_user_party_user_hooks",
      "docs-server/modules/src_services_party_user_party_user_service",
      "docs-server/modules/src_services_party_party_class",
      "docs-server/modules/src_services_party_party_docs",
      "docs-server/modules/src_services_party_party_hooks",
      "docs-server/modules/src_services_party_party_service",
      "docs-server/modules/src_services_project_asset_project_asset_access_control",
      "docs-server/modules/src_services_project_asset_project_asset_class",
      "docs-server/modules/src_services_project_asset_project_asset_hooks",
      "docs-server/modules/src_services_project_asset_project_asset_service",
      "docs-server/modules/src_services_project_generate_collection_hook",
      "docs-server/modules/src_services_project_project_helper",
      "docs-server/modules/src_services_project_project_access_control",
      "docs-server/modules/src_services_project_project_class",
      "docs-server/modules/src_services_project_project_docs",
      "docs-server/modules/src_services_project_project_hooks",
      "docs-server/modules/src_services_project_project_service",
      "docs-server/modules/src_services_public_video_public_video_class",
      "docs-server/modules/src_services_public_video_public_video_hooks",
      "docs-server/modules/src_services_public_video_public_video_service",
      "docs-server/modules/src_services_publish_project_publish_project_class",
      "docs-server/modules/src_services_publish_project_publish_project_docs",
      "docs-server/modules/src_services_publish_project_publish_project_hooks",
      "docs-server/modules/src_services_publish_project_publish_project_service",
      "docs-server/modules/src_services_resolve_media_resolve_media_class",
      "docs-server/modules/src_services_resolve_media_resolve_media_docs",
      "docs-server/modules/src_services_resolve_media_resolve_media_hooks",
      "docs-server/modules/src_services_resolve_media_resolve_media_service",
      "docs-server/modules/src_services_rtc_ports_rtc_ports_class",
      "docs-server/modules/src_services_rtc_ports_rtc_ports_docs",
      "docs-server/modules/src_services_rtc_ports_rtc_ports_hooks",
      "docs-server/modules/src_services_rtc_ports_rtc_ports_service",
      "docs-server/modules/src_services_scene_listing_scene_listing_class",
      "docs-server/modules/src_services_scene_listing_scene_listing_hooks",
      "docs-server/modules/src_services_scene_listing_scene_listing_service",
      "docs-server/modules/src_services_scene_scene_class",
      "docs-server/modules/src_services_scene_scene_hooks",
      "docs-server/modules/src_services_scene_scene_service",
      "docs-server/modules/src_services_seat_status_seat_status_class",
      "docs-server/modules/src_services_seat_status_seat_status_docs",
      "docs-server/modules/src_services_seat_status_seat_status_hooks",
      "docs-server/modules/src_services_seat_status_seat_status_seed",
      "docs-server/modules/src_services_seat_status_seat_status_service",
      "docs-server/modules/src_services_seat_seat_class",
      "docs-server/modules/src_services_seat_seat_docs",
      "docs-server/modules/src_services_seat_seat_hooks",
      "docs-server/modules/src_services_seat_seat_service",
      "docs-server/modules/src_services_sms_awssns",
      "docs-server/modules/src_services_sms_sms_class",
      "docs-server/modules/src_services_sms_sms_docs",
      "docs-server/modules/src_services_sms_sms_hooks",
      "docs-server/modules/src_services_sms_sms_service",
      "docs-server/modules/src_services_static_resource_type_static_resource_type_class",
      "docs-server/modules/src_services_static_resource_type_static_resource_type_docs",
      "docs-server/modules/src_services_static_resource_type_static_resource_type_hooks",
      "docs-server/modules/src_services_static_resource_type_static_resource_type_seed",
      "docs-server/modules/src_services_static_resource_type_static_resource_type_service",
      "docs-server/modules/src_services_static_resource_static_resource_class",
      "docs-server/modules/src_services_static_resource_static_resource_docs",
      "docs-server/modules/src_services_static_resource_static_resource_hooks",
      "docs-server/modules/src_services_static_resource_static_resource_seed",
      "docs-server/modules/src_services_static_resource_static_resource_service",
      "docs-server/modules/src_services_subscription_confirm_subscription_confirm_class",
      "docs-server/modules/src_services_subscription_confirm_subscription_confirm_docs",
      "docs-server/modules/src_services_subscription_confirm_subscription_confirm_hooks",
      "docs-server/modules/src_services_subscription_confirm_subscription_confirm_service",
      "docs-server/modules/src_services_subscription_level_subscription_level_class",
      "docs-server/modules/src_services_subscription_level_subscription_level_docs",
      "docs-server/modules/src_services_subscription_level_subscription_level_hooks",
      "docs-server/modules/src_services_subscription_level_subscription_level_seed",
      "docs-server/modules/src_services_subscription_level_subscription_level_service",
      "docs-server/modules/src_services_subscription_type_subscription_type_class",
      "docs-server/modules/src_services_subscription_type_subscription_type_docs",
      "docs-server/modules/src_services_subscription_type_subscription_type_hooks",
      "docs-server/modules/src_services_subscription_type_subscription_type_seed",
      "docs-server/modules/src_services_subscription_type_subscription_type_service",
      "docs-server/modules/src_services_subscription_subscription_class",
      "docs-server/modules/src_services_subscription_subscription_docs",
      "docs-server/modules/src_services_subscription_subscription_hooks",
      "docs-server/modules/src_services_subscription_subscription_service",
      "docs-server/modules/src_services_tag_tag_class",
      "docs-server/modules/src_services_tag_tag_docs",
      "docs-server/modules/src_services_tag_tag_hooks",
      "docs-server/modules/src_services_tag_tag_service",
      "docs-server/modules/src_services_upload_media_upload_media_class",
      "docs-server/modules/src_services_upload_media_upload_media_hooks",
      "docs-server/modules/src_services_upload_media_upload_media_service",
      "docs-server/modules/src_services_upload_presigned_upload_presigned_class",
      "docs-server/modules/src_services_upload_presigned_upload_presigned_docs",
      "docs-server/modules/src_services_upload_presigned_upload_presigned_hooks",
      "docs-server/modules/src_services_upload_presigned_upload_presigned_service",
      "docs-server/modules/src_services_upload_upload_class",
      "docs-server/modules/src_services_upload_upload_docs",
      "docs-server/modules/src_services_upload_upload_hooks",
      "docs-server/modules/src_services_upload_upload_service",
      "docs-server/modules/src_services_user_relationship_type_user_relationship_type_class",
      "docs-server/modules/src_services_user_relationship_type_user_relationship_type_docs",
      "docs-server/modules/src_services_user_relationship_type_user_relationship_type_hooks",
      "docs-server/modules/src_services_user_relationship_type_user_relationship_type_seed",
      "docs-server/modules/src_services_user_relationship_type_user_relationship_type_service",
      "docs-server/modules/src_services_user_relationship_user_ralationship_docs",
      "docs-server/modules/src_services_user_relationship_user_relationship_class",
      "docs-server/modules/src_services_user_relationship_user_relationship_hooks",
      "docs-server/modules/src_services_user_relationship_user_relationship_service",
      "docs-server/modules/src_services_user_role_user_role_class",
      "docs-server/modules/src_services_user_role_user_role_docs",
      "docs-server/modules/src_services_user_role_user_role_hooks",
      "docs-server/modules/src_services_user_role_user_role_seed",
      "docs-server/modules/src_services_user_role_user_role_service",
      "docs-server/modules/src_services_user_settings_user_settings_class",
      "docs-server/modules/src_services_user_settings_user_settings_docs",
      "docs-server/modules/src_services_user_settings_user_settings_hooks",
      "docs-server/modules/src_services_user_settings_user_settings_service",
      "docs-server/modules/src_services_user_user_access_control",
      "docs-server/modules/src_services_user_user_class",
      "docs-server/modules/src_services_user_user_docs",
      "docs-server/modules/src_services_user_user_hooks",
      "docs-server/modules/src_services_user_user_seed",
      "docs-server/modules/src_services_user_user_service",
      "docs-server/modules/src_services_video_video_class",
      "docs-server/modules/src_services_video_video_hooks",
      "docs-server/modules/src_services_video_video_service",
      "docs-server/modules/src_socket_party_socket",
      "docs-server/modules/src_storage_local_storage",
      "docs-server/modules/src_storage_s3_storage",
      "docs-server/modules/src_storage_storageprovider",
      "docs-server/modules/src_storage_storageprovider_interface",
      "docs-server/modules/src_storage_storagetypes_enum",
      "docs-server/modules/src_strategies_custom_oauth",
      "docs-server/modules/src_strategies_facebook",
      "docs-server/modules/src_strategies_github",
      "docs-server/modules/src_strategies_google",
      "docs-server/modules/src_strategies_jwt",
      "docs-server/modules/src_strategies_linkedin",
      "docs-server/modules/src_strategies_local",
      "docs-server/modules/src_strategies_twitter",
      "docs-server/modules/src_util_capitalize",
      "docs-server/modules/src_util_generate_short_id",
      "docs-server/modules/src_util_get_basic_mimetype",
      "docs-server/modules/src_util_get_local_server_ip",
      "docs-server/modules/src_util_model_resolver"
    ]
  },
  {
    "type": "category",
    "label": "Enumerations",
    "items": [
      "docs-server/enums/src_storage_storagetypes_enum.storagetypes"
    ]
  },
  {
    "type": "category",
    "label": "Classes",
    "items": [
      "docs-server/classes/src_gameserver_webrtcgameserver.webrtcgameserver",
      "docs-server/classes/src_gameserver_transports_socketwebrtcservertransport.socketwebrtcservertransport",
      "docs-server/classes/src_services_accept_invite_accept_invite_class.acceptinvite",
      "docs-server/classes/src_services_attribution_attribution_class.attribution",
      "docs-server/classes/src_services_auth_management_auth_management_class.authmanagement",
      "docs-server/classes/src_services_channel_type_channel_type_class.channeltype",
      "docs-server/classes/src_services_channel_channel_class.channel",
      "docs-server/classes/src_services_collection_type_collection_type_class.collectiontype",
      "docs-server/classes/src_services_collection_collection_class.collection",
      "docs-server/classes/src_services_comments_fires_comments_fires_class.commentsfire",
      "docs-server/classes/src_services_comments_comments_class.comments",
      "docs-server/classes/src_services_component_type_component_type_class.componenttype",
      "docs-server/classes/src_services_component_component_class.component",
      "docs-server/classes/src_services_creator_creator_class.creator",
      "docs-server/classes/src_services_email_email_class.email",
      "docs-server/classes/src_services_entity_entity_class.entity",
      "docs-server/classes/src_services_feed_bookmark_feed_bookmark_class.feedbookmark",
      "docs-server/classes/src_services_feed_fires_feed_fires_class.feedfires",
      "docs-server/classes/src_services_feed_feed_class.feed",
      "docs-server/classes/src_services_gameserver_subdomain_provision_gameserver_subdomain_provision_class.gameserversubdomainprovision",
      "docs-server/classes/src_services_graphql_graphql_class.graphql",
      "docs-server/classes/src_services_group_user_rank_group_user_rank_class.groupuserrank",
      "docs-server/classes/src_services_group_user_group_user_class.groupuser",
      "docs-server/classes/src_services_group_group_class.group",
      "docs-server/classes/src_services_identity_provider_identity_provider_class.identityprovider",
      "docs-server/classes/src_services_instance_provision_instance_provision_class.instanceprovision",
      "docs-server/classes/src_services_instance_instance_class.instance",
      "docs-server/classes/src_services_invite_type_invite_type_class.invitetype",
      "docs-server/classes/src_services_invite_invite_class.invite",
      "docs-server/classes/src_services_license_license_class.license",
      "docs-server/classes/src_services_location_admin_location_admin_class.locationadmin",
      "docs-server/classes/src_services_location_ban_location_ban_class.locationban",
      "docs-server/classes/src_services_location_settings_location_settings_class.locationsettings",
      "docs-server/classes/src_services_location_type_location_type_class.locationtype",
      "docs-server/classes/src_services_location_location_class.location",
      "docs-server/classes/src_services_login_token_login_token_class.logintoken",
      "docs-server/classes/src_services_login_login_class.login",
      "docs-server/classes/src_services_magic_link_magic_link_class.magiclink",
      "docs-server/classes/src_services_media_search_media_search_class.mediasearch",
      "docs-server/classes/src_services_message_status_message_status_class.messagestatus",
      "docs-server/classes/src_services_message_message_class.message",
      "docs-server/classes/src_services_meta_meta_class.meta",
      "docs-server/classes/src_services_party_user_party_user_class.partyuser",
      "docs-server/classes/src_services_party_party_class.party",
      "docs-server/classes/src_services_project_asset_project_asset_class.projectasset",
      "docs-server/classes/src_services_project_project_class.project",
      "docs-server/classes/src_services_public_video_public_video_class.publicvideo",
      "docs-server/classes/src_services_publish_project_publish_project_class.publishproject",
      "docs-server/classes/src_services_resolve_media_resolve_media_class.resolvemedia",
      "docs-server/classes/src_services_rtc_ports_rtc_ports_class.rtcports",
      "docs-server/classes/src_services_scene_listing_scene_listing_class.scenelisting",
      "docs-server/classes/src_services_scene_scene_class.scene",
      "docs-server/classes/src_services_seat_status_seat_status_class.seatstatus",
      "docs-server/classes/src_services_seat_seat_class.seat",
      "docs-server/classes/src_services_sms_sms_class.sms",
      "docs-server/classes/src_services_static_resource_type_static_resource_type_class.staticresourcetype",
      "docs-server/classes/src_services_static_resource_static_resource_class.staticresource",
      "docs-server/classes/src_services_subscription_confirm_subscription_confirm_class.subscriptionconfirm",
      "docs-server/classes/src_services_subscription_level_subscription_level_class.subscriptionlevel",
      "docs-server/classes/src_services_subscription_type_subscription_type_class.subscriptiontype",
      "docs-server/classes/src_services_subscription_subscription_class.subscription",
      "docs-server/classes/src_services_tag_tag_class.tag",
      "docs-server/classes/src_services_upload_media_upload_media_class.uploadmedia",
      "docs-server/classes/src_services_upload_presigned_upload_presigned_class.uploadpresigned",
      "docs-server/classes/src_services_upload_upload_class.upload",
      "docs-server/classes/src_services_user_relationship_type_user_relationship_type_class.userrelationshiptype",
      "docs-server/classes/src_services_user_relationship_user_relationship_class.userrelationship",
      "docs-server/classes/src_services_user_role_user_role_class.userrole",
      "docs-server/classes/src_services_user_settings_user_settings_class.usersettings",
      "docs-server/classes/src_services_user_user_class.user",
      "docs-server/classes/src_services_video_video_class.video",
      "docs-server/classes/src_storage_local_storage.default",
      "docs-server/classes/src_storage_s3_storage.default",
      "docs-server/classes/src_storage_storageprovider.default",
      "docs-server/classes/src_strategies_custom_oauth.default",
      "docs-server/classes/src_strategies_facebook.default",
      "docs-server/classes/src_strategies_github.default",
      "docs-server/classes/src_strategies_google.default",
      "docs-server/classes/src_strategies_jwt.myjwtstrategy",
      "docs-server/classes/src_strategies_linkedin.default",
      "docs-server/classes/src_strategies_local.mylocalstrategy",
      "docs-server/classes/src_strategies_twitter.default"
    ]
  },
  {
    "type": "category",
    "label": "Interfaces",
    "items": [
      "docs-server/interfaces/src_declarations.servicetypes",
      "docs-server/interfaces/src_gameserver_transports_client.client",
      "docs-server/interfaces/src_storage_storageprovider_interface.storageproviderinterface"
    ]
  }
];