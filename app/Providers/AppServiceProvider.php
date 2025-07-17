<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {   \Illuminate\Support\Facades\Blade::directive('localizedRoute', function ($expression) {
            return "<?php echo \App\Helpers\UrlHelper::localizedRoute($expression); ?>";
        });
        //
         if (request()->hasSession()) {
            $locale = session('locale', config('app.locale', 'ru'));

            if (in_array($locale, ['ru', 'en', 'uz'])) {
                app()->setLocale($locale);
            }
        }
    }
}
