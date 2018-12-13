<!--suppress ALL -->
<template>
    <div class="layout-page">
        <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div class="container is-fluid">
                <div class="navbar-brand">
                    <router-link class="navbar-item" to="/">
                        <img src="/assets/images/logo.png">
                    </router-link>

                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                       data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <router-link to="/" class="navbar-item">
                            Home
                        </router-link>

                        <router-link to="/documentation" class="navbar-item">
                            Documentation
                        </router-link>
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
        <footer class="footer">
            <div class="container is-fluid">
                <div class="level">
                    <div class="level-left">
                        <div class="content">
                            <p class="title is-5">Made by <a href="https://github.com/cahyowhy">Cahyo wibowo</a></p>
                            <p>Licensed under <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>
                            </p>
                            <div class="control">
                                <div class="tags has-addons">
                                    <span class="tag is-large is-white"><a href="https://github.com/cahyowhy"
                                                                           target="_blank"><i
                                            class="fab fa-github"></i></a></span>
                                    <span class="tag is-large"><a href="https://facebook.com/pndawa.jalanan"
                                                                  target="_blank"><i
                                            class="fab fa-facebook"></i></a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="level-right">
                        <div>
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><a href="">Documentation</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
    @import "../../style/variable";

    .layout-page {
        nav {
            min-height: 4.5rem;
            box-shadow: 0 6px 6px $white-ter;
            @media screen and (max-width: 768px) {
                display: flex;
                align-items: center;
            }

        }
        .content-wrapper {
            margin-top: 5rem;
        }
        > footer.footer {
            padding: 3rem 1.5rem;
            margin-top: 3rem;
            background-color: $grey-darker;
            p, span, a, a:hover {
                color: white;
            }
            .content p {
                a:hover {
                    padding-bottom: .2rem;
                    border-bottom: 2px solid white;
                }
            }
            .level-right {
                ul {
                    li {
                        display: inline;
                        &:not(:last-child)::after {
                            content: "•";
                            color: white;
                            margin: 0 .5rem;
                        }
                        a:hover {
                            font-weight: bold;
                        }
                    }
                }
            }
            .level-left {
                p {
                    margin-bottom: 0;
                    &:nth-child(2) {
                        margin-bottom: 1rem;
                    }
                }
                span.tag {
                    &.is-white {
                        a, a:hover {
                            color: $grey-darker;
                        }
                    }
                    &:last-child {
                        background-color: $color_facebook;
                    }
                }
            }
        }
    }
</style>