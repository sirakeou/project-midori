use tauri_plugin_sql::{Builder as SqlBuilder, Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(
      SqlBuilder::default()
        .add_migrations(
          "sqlite:app.db",
          vec![
            Migration {
              version: 1,
              description: "initial_schema",
              sql: include_str!("../migrations/001_initial_schema.sql"),
              kind: MigrationKind::Up,
            },
            Migration {
              version: 2,
              description: "seed_skills",
              sql: include_str!("../migrations/002_seed_skills.sql"),
              kind: MigrationKind::Up,
            },
            Migration {
              version: 3,
              description: "seed_users",
              sql: include_str!("../migrations/003_seed_users.sql"),
              kind: MigrationKind::Up,
            },
            Migration {
              version: 4,
              description: "seed_personal_profiles",
              sql: include_str!("../migrations/004_seed_personal_profiles.sql"),
              kind: MigrationKind::Up,
            },
            Migration {
              version: 5,
              description: "seed_skill_assessments",
              sql: include_str!("../migrations/005_seed_skill_assessments.sql"),
              kind: MigrationKind::Up,
            },
          ],
        )
        .build(),
    )
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
