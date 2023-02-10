import { Block } from "core";
import { searchUsers } from "services/userService";
import { withStore } from "utils/withStore";
import "./searchUsersList.css";

interface ISearchUsersListProps {
  searchId: string;
  usersList: () => Nullable<Array>;
  onSearchUsers: () => void;
}

const SEARCHID = "search_users";

class SearchUsersList extends Block<ISearchUsersListProps> {
  static componentName = "SearchUsersList";

  constructor(props: ISearchUsersListProps) {
    super(props);

    this.setProps({
      searchId: SEARCHID,
      onSearchUsers: this.onSearchUsers
    });
  }

  onSearchUsers() {
    const searchUsersInput: Nullable<HTMLInputElement> = document.querySelector(
      `#${SEARCHID}`
    );

    if (searchUsersInput) {
      const login = searchUsersInput.value;

      if (login) {
        window.store.dispatch(searchUsers, { login });
      }
    }
  }

  protected render(): string {
    return `
      <div class="search-users-list">
        <div class="search-users-list__search">
          {{{Search placeholder="Выбрать пользователя" id=searchId }}}
          {{{Button size='s'text='Найти' onClick=onSearchUsers}}}
        </div>
        <div class="search-users-list__list">
          {{#each usersList}}
            {{{UserItem
              user=this
              isChecked=this.isChecked
            }}}
          {{/each}}
        </div>
      </div>`;
  }
}

const mapStateToProps: Partial<ISearchUsersListProps> = (state: AppState) => {
  return {
    usersList: () => state.searchUsersList
  };
};

const ComposedSearchUsersList = withStore(SearchUsersList, mapStateToProps);

export { ComposedSearchUsersList as SearchUsersList };
