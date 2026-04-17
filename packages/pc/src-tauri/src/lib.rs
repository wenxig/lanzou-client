mod fs_scheme;
mod logger;

#[tokio::main]
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
  log::debug!("app started");

  let builder = fs_scheme::init(
    tauri::Builder::default()
      .plugin(tauri_plugin_fs::init())
      .plugin(logger::init()),
  );
  let builder = builder
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_better_cors_fetch::init())
    .plugin(tauri_plugin_persisted_scope::init())
    .setup(|_app| {
      let logo = r#"Lanzou-Client"#;
      log::error!("{}", logo);

      // use tauri::{TitleBarStyle, WebviewUrl, WebviewWindowBuilder, window::Color};
      // let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
      //   .title("Transparent Titlebar Window")
      //   .inner_size(800.0, 600.0)
      //   .title_bar_style(TitleBarStyle::Transparent)
      //   .background_color(Color(0, 0, 0, 0));

      // let _window = win_builder.build().unwrap();
      Ok(())
    });

  let _ = builder
    .run(tauri::generate_context!())
    .expect("error while running tauri application");

  log::debug!("app exited");
}
