<!--suppress ALL -->
<template>
    <div class="layout-page">
        <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div class="container is-fluid">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                        <img src="/assets/images/logo.png">
                    </a>

                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                       data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item">
                            Home
                        </a>

                        <a class="navbar-item">
                            Documentation
                        </a>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                Information
                            </a>

                            <div class="navbar-dropdown">
                                <a class="navbar-item">
                                    Current Version
                                </a>
                                <a class="navbar-item">
                                    Bulma Version
                                </a>
                                <hr class="navbar-divider">
                                <a class="navbar-item">
                                    Report an issue
                                </a>
                                <a class="navbar-item">
                                    Changelog
                                </a>
                            </div>
                        </div>
                        <div class="navbar-item">
                            <div class="buttons">
                                <a class="button is-info">
                                    Share
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container is-fluid content-wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "../../style/variable";

    .layout-page {
        nav {
            min-height: 4.5rem;
            box-shadow: 0 6px 6px $white-ter;
        }
        .content-wrapper {
            margin-top: 5rem;
        }
    }
</style>