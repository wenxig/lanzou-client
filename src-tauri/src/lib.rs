mod fs_scheme;
mod logger;

#[tokio::main]
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
  log::debug!("app started");

  let builder = fs_scheme::init(
    tauri::Builder::default()
      .plugin(tauri_plugin_fs::init())
      .plugin(logger::init())
  );
  let builder = builder
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_better_cors_fetch::init())
    .plugin(tauri_plugin_persisted_scope::init())
    .setup(|_app| {
      let logo = r#"Lanzou-Client"#;

      log::error!("{}", logo);
      Ok(())
    });

  match builder.build(tauri::generate_context!()) {
    Ok(builder) => builder.run(|handler, event| match event {
      _ => {}
    }),
    Err(err) => log::error!("error while running tauri application: {}", err),
  }

  log::debug!("app exited");
}
